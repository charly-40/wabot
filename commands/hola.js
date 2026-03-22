export const command = "hola";

export async function execute(sock, msg, from, args) {
    await sock.sendMessage(from, {
        text: "Hola, Laboratorio Python te da la bienvenida 🤖"
    });
}
