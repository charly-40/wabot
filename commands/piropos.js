import fs from "fs";

export const command = "piropos";
export const category = "diversion";

export async function execute(sock, msg, from, args) {

    if (!args[0]) {
        return sock.sendMessage(from, {
            text: "❌ Usa: !piropos mujer | !piropos hombre"
        });
    }

    const tipo = args[0].toLowerCase();

    if (!["mujer", "hombre"].includes(tipo)) {
        return sock.sendMessage(from, {
            text: "❌ Usa: !piropos mujer | !piropos hombre"
        });
    }

    let data;

    try {
        data = JSON.parse(
            fs.readFileSync("./data/piropos.json", "utf8")
        );
    } catch (e) {

        console.error("Error leyendo piropos:", e);

        return sock.sendMessage(from, {
            text: "⚠️ Error cargando piropos"
        });
    }

    const lista = data[tipo];

    if (!lista || lista.length === 0) {
        return sock.sendMessage(from, {
            text: "⚠️ No hay piropos disponibles"
        });
    }

    const random =
        lista[Math.floor(Math.random() * lista.length)];

    await sock.sendMessage(from, {
        text: `💌 ${random}`
    });
}
