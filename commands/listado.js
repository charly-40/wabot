import fs from "fs";

export const command = "listado";
export const adminOnly = true;
export const category = "admin";

const namesPath = "./data/names.json";

/* ================= CÓDIGOS DE PAÍS ================= */

const COUNTRY_CODES = {

    // Centroamérica
    "502": "gua",
    "503": "sal",
    "504": "hon",
    "505": "nic",
    "506": "crc",
    "507": "pan",
    "501": "blz",

    // Sudamérica
    "591": "bol",
    "593": "ecu",
    "595": "par",
    "598": "uru",

    // Europa (3 dígitos)
    "351": "por",
    "420": "cze",
    "421": "svk",

    // Medio Oriente
    "971": "uae",
    "966": "ksa",
    "972": "isr",
    "974": "qat",
    "965": "kwt",
    "962": "jor",

    // África
    "212": "mar",
    "213": "alg",
    "216": "tun",
    "221": "sen",
    "234": "nga",
    "254": "ken",
    "255": "tan",
    "27": "rsa",

    // Norteamérica
    "52": "mex",
    "1": "usa",

    // Sudamérica (2 dígitos)
    "54": "arg",
    "55": "bra",
    "56": "chi",
    "57": "col",
    "58": "ven",
    "51": "per",

    // Europa (2 dígitos)
    "34": "esp",
    "33": "fra",
    "39": "ita",
    "49": "ger",
    "44": "uk",
    "31": "ned",
    "32": "bel",
    "41": "sui",
    "43": "aut",
    "45": "den",
    "46": "swe",
    "47": "nor",
    "48": "pol",
    "36": "hun",
    "40": "rou",
    "90": "tur",
    "30": "gre",

    // Asia
    "81": "jpn",
    "82": "kor",
    "86": "chn",
    "91": "ind",
    "92": "pak",
    "60": "mys",
    "62": "idn",
    "63": "phi",
    "65": "sgp",
    "66": "tha",
    "84": "vnm",

    // Oceanía
    "61": "aus",
    "64": "nzl",

    // Caribe
    "53": "cub",
    "59": "car",

    // Otros
    "20": "egy",
    "221": "sen"
};

/* ================= HELPERS ================= */

function readNames() {

    if (!fs.existsSync(namesPath)) {
        fs.writeFileSync(namesPath, "{}");
        return {};
    }

    try {
        return JSON.parse(fs.readFileSync(namesPath));
    } catch {
        fs.writeFileSync(namesPath, "{}");
        return {};
    }
}

function getCountry(num) {

    const codes = Object.keys(COUNTRY_CODES)
        .sort((a, b) => b.length - a.length);

    for (const code of codes) {
        if (num.startsWith(code)) {
            return COUNTRY_CODES[code];
        }
    }

    return "unk";
}

/* ================= COMMAND ================= */

export async function execute(sock, msg, from) {

    if (!from.endsWith("@g.us")) {
        return sock.sendMessage(from, {
            text: "❌ Solo funciona en grupos"
        });
    }

    const meta = await sock.groupMetadata(from);

    const names = readNames();

    // Excluir admins
    const users = meta.participants.filter(p => !p.admin);

    if (!users.length) {
        return sock.sendMessage(from, {
            text: "❌ No hay usuarios"
        });
    }

    let text = "";

    for (const p of users) {

        const jid = p.id;

        const number = jid.split("@")[0];

        const last4 = number.slice(-4);

        const country = getCountry(number);

        let name =
            names[jid] ||
            p.notify ||
            number;

        if (name.length > 25) {
            name = name.slice(0, 25);
        }

        text += `${name} | ${country} | ${last4}\n`;
    }

    await sock.sendMessage(from, { text });
}
