import fs from "fs";

export const command = "invocarinactivos";
export const adminOnly = true;
export const category = "admin";

const dataPath = "./data/activity.json";

export async function execute(sock, msg, from) {

    const meta = await sock.groupMetadata(from);

    let activity = {};

    if (fs.existsSync(dataPath)) {
        activity = JSON.parse(fs.readFileSync(dataPath));
    }

    const now = Date.now();

    // 6 horas sin hablar = inactivo
    const LIMIT = 6 * 60 * 60 * 1000;

    const silent = meta.participants
        .map(p => p.id)
        .filter(id => {

            const last = activity[id] || 0;

            return now - last > LIMIT;
        });

    if (!silent.length) {
        return sock.sendMessage(from, {
            text: "✅ Nadie está inactivo"
        });
    }

    const texto = silent
        .map((u, i) => `${i + 1}. @${u.split("@")[0]}`)
        .join("\n");

    await sock.sendMessage(from, {
        text: `👀 *Inactivos (6h+):*\n\n${texto}`,
        mentions: silent
    });
}
