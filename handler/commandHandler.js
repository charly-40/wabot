import fs from "fs";
import { USERS, ROLES } from "../config/roles.js";

const commands = new Map();

export function loadCommands() {

    const files = fs
        .readdirSync("./commands")
        .filter(f => f.endsWith(".js"));

    for (const file of files) {

        import(`../commands/${file}`).then(mod => {

            const command = mod.command || mod.default?.command;

            if (!command) {
                console.log(`⚠️ Comando inválido: ${file}`);
                return;
            }

            commands.set(command, mod);

            console.log(`✅ ${command} cargado`);
        });

    }
}

function getUserRole(jid) {
    return USERS[jid] || ROLES.USER;
}

export async function handleCommand(sock, msg, text, from) {

    if (!text.startsWith("!")) return;

    const args = text.slice(1).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    if (!commands.has(cmd)) return;

    const command = commands.get(cmd);

    const role = getUserRole(from);

    // Verificar si es grupo
    const isGroup = from.endsWith("@g.us");

    let isAdmin = false;

    if (isGroup) {

        const meta = await sock.groupMetadata(from);

        isAdmin = meta.participants.some(p =>
            p.id === msg.key.participant &&
            (p.admin === "admin" || p.admin === "superadmin")
        );
    }

    // Protección admin
    if (command.adminOnly && !isAdmin && role !== "owner") {

        return sock.sendMessage(from, {
            text: "⛔ Solo administradores pueden usar este comando"
        });
    }

    try {

        await command.execute(sock, msg, from, args);

    } catch (err) {

        console.error(err);

        await sock.sendMessage(from, {
            text: "⚠️ Error en comando"
        });
    }
}

