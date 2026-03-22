import makeWASocket, {
    DisconnectReason,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} from "@whiskeysockets/baileys";

import pino from "pino";
import qrcode from "qrcode-terminal";
import { Boom } from "@hapi/boom";
import fs from "fs";

import { hasSession, handleWizardInput } from "./handler/imgWizard.js";
import {
    hasSession as hasPromptSession,
    handleInput as handlePromptInput
} from "./handler/prompt/core.js";

import { handleGameMessage } from "./handler/impostorHandler.js";
import { loadCommands, handleCommand } from "./handler/commandHandler.js";
import { checkBadWords } from "./handler/autoModeration.js";

/* ================= ARCHIVOS ================= */

const activityPath = "./data/activity.json";
const namesPath = "./data/names.json";

/* ================= COOLDOWN SALUDOS ================= */

const greetingCooldown = {}; // { groupId: timestamp }
const GREETING_DELAY = 10 * 60 * 1000; // 10 min

/* ================= HELPERS ================= */

function readJSON(path) {

    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "{}");
        return {};
    }

    try {
        return JSON.parse(fs.readFileSync(path));
    } catch {
        fs.writeFileSync(path, "{}");
        return {};
    }
}

function writeJSON(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

/* ================= ACTIVIDAD ================= */

function saveActivity(user) {

    const data = readJSON(activityPath);

    data[user] = Date.now();

    writeJSON(activityPath, data);
}

function saveName(jid, name) {

    if (!name) return;

    const data = readJSON(namesPath);

    data[jid] = name;

    writeJSON(namesPath, data);
}

/* ================= SALUDOS ================= */

function isGreeting(text) {

    const clean = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    const greetings = [
        "hola",
        "buenos dias",
        "buenas tardes",
        "buenas noches",
        "que tal",
        "hey",
        "buenas"
    ];

    return greetings.includes(clean);
}

function getGreetingResponse(name) {

    const n = name ? ` ${name}` : "";

    const responses = [
        `👋 Hola${n}, bienvenido al grupo 💪`,
        `✨ Qué gusto verte${n}, vamos con todo`,
        `🚀 Hola${n}, listo para crear algo increíble`,
        `🔥 Buenas${n}, aquí estamos para apoyarnos`,
        `🧠 Hola${n}, sigamos aprendiendo juntos`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

function canGreet(groupId) {

    const now = Date.now();

    if (!greetingCooldown[groupId]) {
        greetingCooldown[groupId] = now;
        return true;
    }

    if (now - greetingCooldown[groupId] > GREETING_DELAY) {
        greetingCooldown[groupId] = now;
        return true;
    }

    return false;
}

/* ================= BOT ================= */

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("session");

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        auth: state
    });

    loadCommands();

    sock.ev.on("creds.update", saveCreds);

    /* ============ CONEXIÓN ============ */

    sock.ev.on("connection.update", (update) => {

        const { connection, lastDisconnect, qr } = update;

        if (qr) qrcode.generate(qr, { small: true });

        if (connection === "close") {

            const reason = new Boom(
                lastDisconnect?.error
            )?.output?.statusCode;

            if (reason !== DisconnectReason.loggedOut) {

                console.log("⚠️ Reconectando en 5 segundos...");
                setTimeout(startBot, 5000);

            } else {

                console.log("❌ Borra session y escanea");
            }
        }

        if (connection === "open") {
            console.log("✅ Conectado");
        }
    });

    /* ============ MENSAJES ============ */

    sock.ev.on("messages.upsert", async (m) => {

        const msg = m.messages[0];

        if (!msg?.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;

        const user = msg.key.participant || msg.key.remoteJid;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        if (!text) return;

        // Guardar actividad y nombre
        saveActivity(user);
        saveName(user, msg.pushName);

        console.log("📩", text);

        /* ===== MODERACIÓN ===== */
        await checkBadWords(sock, msg, text, from);

        /* ===== SALUDOS INTELIGENTES ===== */

        if (from.endsWith("@g.us") && isGreeting(text)) {

            if (canGreet(from)) {

                const reply = getGreetingResponse(msg.pushName);

                await sock.sendMessage(from, { text: reply });

                return;
            }
        }

        /* ===== IMG WIZARD ===== */

        if (hasSession(user)) {

            const response = handleWizardInput(user, text);

            if (!response) return;

            if (response.done) {

                await sock.sendMessage(from, {
                    text:
                        `🧠 PROMPT:\n\n${response.prompt}\n\n⚠️ NEGATIVE:\n${response.negative}`
                });

            } else {

                await sock.sendMessage(from, {
                    text: response
                });

            }

            return;
        }

        /* ===== PROMPT WIZARD ===== */

        if (hasPromptSession(user)) {

            const response = handlePromptInput(user, text);

            if (!response) return;

            if (response.done) {

                await sock.sendMessage(from, {
                    text: `🧠 PROMPT FINAL:\n\n${response.result}`
                });

            } else {

                await sock.sendMessage(from, {
                    text: response
                });

            }

            return;
        }

        /* ===== JUEGOS ===== */

        await handleGameMessage(sock, msg, text, from);

        /* ===== COMANDOS ===== */

        await handleCommand(sock, msg, text, from);

    });

}

startBot();
