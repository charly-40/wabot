export const command = "invocar";
export const adminOnly = true;
export const category = "admin";

export async function execute(sock, msg, from) {

    const meta = await sock.groupMetadata(from);

    const users = meta.participants.map(p => p.id);

    if (!users.length) {
        return sock.sendMessage(from, { text: "❌ No hay usuarios" });
    }

    const texto = users
        .map((u, i) => `${i + 1}. @${u.split("@")[0]}`)
        .join("\n");

    await sock.sendMessage(from, {
        text: `📢 *¡Todos presentes!*\n\n${texto}`,
        mentions: users
    });
}
