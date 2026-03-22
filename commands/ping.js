export const command = "ping";
export const role = null;

export async function execute(sock, msg, from) {

    await sock.sendMessage(from, {
        text: "🏓 Pong!"
    });
}
