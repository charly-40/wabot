export const command = "chisme";
export const category = "diversion";

const chismes = [
    "Dicen que alguien aquí stalkea en secreto 👀",
    "Alguien del grupo tiene capturas guardadas 😳",
    "Se rumora que dos personas aquí ya se gustan 🤭",
    "Alguien revisa el grupo aunque diga que no le importa",
    "Hay alguien que lee todo pero nunca responde",
    "Uno de ustedes es más celoso de lo que aparenta",
    "Alguien aquí borra mensajes sospechosamente rápido"
];

export async function execute(sock, msg, from) {

    if (!from.endsWith("@g.us")) return;

    const random = chismes[Math.floor(Math.random() * chismes.length)];

    await sock.sendMessage(from, {
        text: `🫢 *CHISME DEL GRUPO*\n\n${random}`
    });
}
