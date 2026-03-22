export const command = "admin";

export const role = "owner";

export async function execute(sock, msg, from, args) {

    await sock.sendMessage(from, {
        text: "👑 Panel admin activo"
    });
}
