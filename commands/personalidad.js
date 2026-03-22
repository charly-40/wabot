export const command = "personalidad";
export const category = "diversion";

export async function execute(sock, msg, from, args) {

    if (!from.endsWith("@g.us")) return;

    const meta = await sock.groupMetadata(from);
    const members = meta.participants.map(p => p.id);

    const user = members[Math.floor(Math.random() * members.length)];

    const carisma = Math.floor(Math.random() * 101);
    const drama = Math.floor(Math.random() * 101);
    const flow = Math.floor(Math.random() * 101);
    const misterio = Math.floor(Math.random() * 101);

    await sock.sendMessage(from, {
        text:
`🧠 *ANÁLISIS DE PERSONALIDAD*

@${user.split("@")[0]}

✨ Carisma: ${carisma}%
🎭 Drama: ${drama}%
🔥 Flow: ${flow}%
🕵️ Misterio: ${misterio}%`,
        mentions: [user]
    });
}
