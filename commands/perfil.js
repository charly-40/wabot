export const command = "perfil";

export async function execute(sock, msg, from) {

    const nombre =
        msg.pushName || "Usuario misterioso 😄";

    await sock.sendMessage(from, {
        text: `😎 Perfil de ${nombre}\nNivel: Legendario 💪🔥`
    });
}
