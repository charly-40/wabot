const bromas = [
    "Hoy invita el que lea esto 😂",
    "Se cayó el sistema… mentira 😎",
    "El admin anda dormido 😴",
    "Este grupo necesita unas chelas 🍻",
    "Aquí hay puro VIP 😏"
];

export const command = "broma";
export const category = "juegos";

export async function execute(sock, msg, from) {

    const b = bromas[Math.floor(Math.random() * bromas.length)];

    await sock.sendMessage(from, {
        text: `🤣 ${b}`
    });
}
