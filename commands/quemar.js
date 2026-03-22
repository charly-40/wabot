export const command = "quemar";
export const category = "diversion";

const frases = [
    "es tan lento que el WiFi se desespera 😭",
    "cree que 2+2 es misterio nacional 🤦‍♂️",
    "pide consejo a Google y Google le pide ayuda",
    "se tropieza con el mismo pensamiento",
    "si fuera app, sería versión beta eterna",
    "es más dramático que novela de las 8",
    "tiene más excusas que lunes",
    "si fuera superhéroe, sería Capitán Duda"
];

export async function execute(sock, msg, from, args) {

    if (!from.endsWith("@g.us")) return;

    const meta = await sock.groupMetadata(from);
    const members = meta.participants.map(p => p.id);

    const randomUser = members[Math.floor(Math.random() * members.length)];
    const frase = frases[Math.floor(Math.random() * frases.length)];

    await sock.sendMessage(from, {
        text: `🔥 @${randomUser.split("@")[0]} ${frase}`,
        mentions: [randomUser]
    });
}
