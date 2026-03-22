import fs from "fs";

export const command = "menu";
export const role = null; // todos
export const category = "utilidad";

export async function execute(sock, msg, from, args, role) {

    const files = fs
        .readdirSync("./commands")
        .filter(f => f.endsWith(".js"));

    const categories = {};

    /* ===== Leer comandos ===== */

    for (const file of files) {

        const module = await import(`./${file}`);

        if (!module.command) continue;

        if (module.role && module.role !== role) continue;

        const cat = module.category || "otros";

        if (!categories[cat]) {
            categories[cat] = [];
        }

        // ===== IMG =====
        if (module.command === "img") {

            categories[cat].push("!img");
            categories[cat].push("!img pro");
            continue;
        }

        // ===== PROMPT =====
        if (module.command === "prompt") {

            if (module.modes && Array.isArray(module.modes)) {

                module.modes.forEach(m => {
                    categories[cat].push(`!prompt ${m}`);
                });

            } else {
                categories[cat].push("!prompt");
            }

            continue; // 🔥 evita duplicados
        }

        // ===== NORMAL =====
        categories[cat].push(`!${module.command}`);
    }

    /* ===== Construir menú ===== */

    let menu = "";

    menu += "━━━━━━━━━━━━━━━━━━\n";
    menu += "🧪 *LABORATORIO PYTHON*\n";
    menu += "━━━━━━━━━━━━━━━━━━\n\n";

    const categoryNames = {
        admin: "🛡 Administración",
        juegos: "🎮 Juegos",
        diversion: "😂 Diversión",
        info: "📊 Información",
        utilidad: "🛠 Utilidades",
        ia: "🤖 IA / Prompts",
        multimedia: "🎨 Multimedia",
        otros: "📦 Otros"
    };

    for (const cat in categories) {

        const title = categoryNames[cat] || cat;

        menu += `*${title}*\n`;

        categories[cat].forEach(cmd => {
            menu += `  • ${cmd}\n`;
        });

        menu += "\n";
    }

    menu += "━━━━━━━━━━━━━━━━━━\n";
    menu += "✍ Hecho por Charly\n";
    menu += "━━━━━━━━━━━━━━━━━━";

    await sock.sendMessage(from, { text: menu });
}
