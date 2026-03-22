export const command = "warn";
export const adminOnly = true;
export const category = "admin";

const warns = new Map();

export async function execute(sock, msg, from) {

    const mention =
        msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;

    if (!mention?.length) {

        return sock.sendMessage(from, {
            text: "⚠️ Usa: !warn @usuario"
        });
    }

    const user = mention[0];

    const count = (warns.get(user) || 0) + 1;

    warns.set(user, count);

    // Nombre visible
    const nombre = "@" + user.split("@")[0];

    await sock.sendMessage(from, {
        text: `⚠️ ${nombre} tiene ${count}/3 advertencias`,
        mentions: [user]
    });

    // Auto-kick al llegar a 3
    if (count >= 3) {

        await sock.groupParticipantsUpdate(
            from,
            [user],
            "remove"
        );
    }
}
