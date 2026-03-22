import {
    startSession,
    hasSession,
    endSession,
    getFirstQuestion,
    handleInput
} from "../handler/prompt/core.js";

import { getModule } from "../handler/prompt/index.js";

export const command = "prompt";
export const category = "ia";

// 👇 Declaramos modos disponibles
export const modes = ["general", "tecnico", "creativo"];

export async function execute(sock, msg, from, args) {

    const user = msg.key.participant || msg.key.remoteJid;

    if (hasSession(user)) {
        endSession(user);

        return sock.sendMessage(from, {
            text: "❌ Prompt wizard cancelado."
        });
    }

    const mode = args[0] || "general";

    if (!modes.includes(mode)) {

        return sock.sendMessage(from, {
            text: `❌ Modos disponibles:\n• ${modes.join("\n• ")}`
        });
    }

    const module = getModule(mode);

    if (!module) {

        return sock.sendMessage(from, {
            text: "❌ Módulo no encontrado."
        });
    }

    startSession(user, module);

    const first = getFirstQuestion(module);

    await sock.sendMessage(from, {
        text: `🚀 PROMPT WIZARD (${mode.toUpperCase()})\n\n${first}`
    });
}
