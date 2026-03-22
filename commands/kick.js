export const command = "kick";
export const adminOnly = true;
export const category = "admin";

export async function execute(sock, msg, from) {

    const mention =
        msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;

    if (!mention?.length) {

        return sock.sendMessage(from, {
            text: "❌ Usa: !kick @usuario"
        });
    }

    await sock.groupParticipantsUpdate(
        from,
        mention,
        "remove"
    );
}
