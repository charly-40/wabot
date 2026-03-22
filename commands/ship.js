export const command = "ship";
export const category = "diversion";

export async function execute(sock, msg, from, args) {

    if (!from.endsWith("@g.us")) {
        return sock.sendMessage(from, {
            text: "❌ Solo funciona en grupos"
        });
    }

    const meta = await sock.groupMetadata(from);
    const members = meta.participants.map(p => p.id);

    if (members.length < 2) {
        return sock.sendMessage(from, {
            text: "❌ No hay suficientes personas"
        });
    }

    const random1 = members[Math.floor(Math.random() * members.length)];
    let random2;

    do {
        random2 = members[Math.floor(Math.random() * members.length)];
    } while (random2 === random1);

    const porcentaje = Math.floor(Math.random() * 101);

    await sock.sendMessage(from, {
        text: `💘 *SHIP DEL DÍA*\n\n@${random1.split("@")[0]} ❤️ @${random2.split("@")[0]}\n\nCompatibilidad: ${porcentaje}%`,
        mentions: [random1, random2]
    });
}
