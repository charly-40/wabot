export const command = "datos";
export const category = "admin";

export async function execute(sock, msg, from) {

    if (!from.endsWith("@g.us")) {
        return sock.sendMessage(from, {
            text: "❌ Solo funciona en grupos"
        });
    }

    const meta = await sock.groupMetadata(from);

    const admins = meta.participants.filter(p => p.admin);

    const texto =
`📊 *DATOS DEL GRUPO*

📛 Nombre: ${meta.subject}
👥 Miembros: ${meta.participants.length}
👮 Admins: ${admins.length}
📅 Creado: ${new Date(meta.creation * 1000).toLocaleDateString()}

🤖 Bot activo`;

    await sock.sendMessage(from, {
        text: texto
    });
}
