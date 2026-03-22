import fs from "fs";

const warnsPath = "./data/warns.json";
const MAX_WARNS = 3;

/* ================= HELPERS ================= */

function readWarns() {

    if (!fs.existsSync(warnsPath)) {
        fs.writeFileSync(warnsPath, "{}");
        return {};
    }

    try {
        return JSON.parse(fs.readFileSync(warnsPath));
    } catch {
        fs.writeFileSync(warnsPath, "{}");
        return {};
    }
}

function saveWarns(data) {
    fs.writeFileSync(warnsPath, JSON.stringify(data, null, 2));
}

/* ================= MODERATION ================= */

export async function checkBadWords(sock, msg, text, from) {

    // Ignorar textos largos (manuales, guías, explicaciones)
    if (text.length > 400) {
        return;
    }


    // Solo grupos
    if (!from.endsWith("@g.us")) return;

    const user = msg.key.participant;

    if (!user) return;

    // Lista de malas palabras (ajústala)
    const badWords = [
        "puta",
        "pendejo",
        "verga",
        "chingar",
        "cabron",
        "mierda",
        "pinche",
        "culo",
        "joder",
        "coño",
        "hijo de puta",
        "maldito",
        "imbecil",
        "idiota",
        "estupido",
        "estupida",
        "tarada",
        "tarado",
        "boludo",
        "boluda",
        "gordo",
        "feo",
        "tonto",
        "bobo",
        "zorra",
        "perra",
        "maricon",
        "puto",
        "putos",
        "pendeja",
        "pendejos",
        "vergas",
        "chingada"
    ];

    const message = text.toLowerCase();

    // No contiene malas palabras
    if (!badWords.some(w => message.includes(w))) return;

    const warns = readWarns();

    // Crear grupo si no existe
    if (!warns[from]) {
        warns[from] = {};
    }

    // Crear usuario si no existe
    if (!warns[from][user]) {
        warns[from][user] = 0;
    }

    warns[from][user]++;

    const count = warns[from][user];

    // Llegó al límite
    if (count >= MAX_WARNS) {

        // Resetear historial
        delete warns[from][user];

        saveWarns(warns);

        await sock.sendMessage(from, {
            text: `🚫 @${user.split("@")[0]} expulsado por lenguaje inapropiado`,
            mentions: [user]
        });

        await sock.groupParticipantsUpdate(
            from,
            [user],
            "remove"
        );

        return;
    }

    // Guardar cambios
    saveWarns(warns);

    await sock.sendMessage(from, {
        text: `⚠️ @${user.split("@")[0]} advertencia ${count}/${MAX_WARNS}`,
        mentions: [user]
    });
}
