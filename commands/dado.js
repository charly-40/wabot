export const command = "dado";
export const category = "juegos";

export async function execute(sock, msg, from) {

    const num = Math.floor(Math.random() * 6) + 1;

    await sock.sendMessage(from, {
        text: `🎲 Salió: *${num}*`
    });
}
