export const command = "help";
export const category = "utilidad";

export async function execute(sock, msg, from) {

    await sock.sendMessage(from, {
        text: `
📖 *AYUDA*

Usa:
!menu  → Ver comandos
!ping  → Probar bot
!hola  → Saludo
`
    });
}
