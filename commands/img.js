import {
    startWizard,
    cancelWizard,
    hasSession
} from "../handler/imgWizard.js";

export const command = "img";
export const category = "ia";

export async function execute(sock, msg, from, args) {

    const user = msg.key.participant || msg.key.remoteJid;

    if (hasSession(user)) {
        cancelWizard(user);
        return sock.sendMessage(from, {
            text: "❌ Wizard cancelado."
        });
    }

    const mode = args[0] === "pro" ? "pro" : "normal";

    startWizard(user, mode);

    await sock.sendMessage(from, {
        text:
`🎨 IMAGE PROMPT WIZARD (${mode.toUpperCase()})

ESTILO:
1) Fotografía realista
2) Anime
3) Ilustración cinematográfica
4) Render 3D
5) Fantasía
6) Cyberpunk
7) Gótico oscuro

Responde con número o texto:`
    });
}
