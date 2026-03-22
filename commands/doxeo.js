export const command = "doxeo";
export const category = "diversion";

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Obtener mencionado real
function getMention(msg) {

    return (
        msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
        msg.message?.contextInfo?.mentionedJid?.[0] ||
        null
    );
}

export async function execute(sock, msg, from, args) {

    if (!from.endsWith("@g.us")) return;

    const target = getMention(msg);

    if (!target) {
        return sock.sendMessage(from, {
            text: "❌ Usa: !doxeo mencionando a alguien (selecciona desde WhatsApp)"
        });
    }

    const nombre = target.split("@")[0];

    /* ================= LISTAS ================= */

    const ciudades = [
        "Área 51", "CDMX", "Tokio", "París", "Gotham",
        "Springfield", "Pueblo Paleta", "Narnia", "Mordor"
    ];

    const dispositivos = [
        "iPhone 14 Pro",
        "Samsung S23",
        "Nokia 1100",
        "Xiaomi Turbo",
        "Laptop Gamer",
        "Calculadora Casio"
    ];

    const proveedores = [
        "Telmex Ultra",
        "Starlink Pirata",
        "WiFi Vecino",
        "Red Secreta FBI",
        "Internet del Oxxo"
    ];

    const navegadores = [
        "Chrome",
        "Firefox",
        "Opera GX",
        "Internet Explorer 😵",
        "Tor Secreto"
    ];

    const estados = [
        "Soltero/a 😎",
        "En visto 😔",
        "Modo tóxico 😈",
        "Crush activo 💘",
        "Ghosteado 👻"
    ];

    const archivos = [
        "memes_vergonzosos.zip",
        "capturas_secretas.png",
        "selfies_2016.jpg",
        "tareas_no_entregadas.docx",
        "chat_prohibido.txt"
    ];

    /* ================= PROGRESO ================= */

    const pasos = [
        "🕵️ Iniciando rastreo...",
        "📡 Conectando satélites...",
        "💻 Hackeando servidores...",
        "🔍 Analizando historial...",
        "📂 Descargando archivos..."
    ];

    let progreso = "";

    for (let i = 0; i < pasos.length; i++) {

        progreso += `${pasos[i]}\n[${"▓".repeat(i + 1)}${"░".repeat(pasos.length - i - 1)}] ${(i + 1) * 20}%\n\n`;

        await sock.sendMessage(from, {
            text: progreso,
            mentions: [target]
        });

        await new Promise(r => setTimeout(r, 1100));
    }

    /* ================= RESULTADO ================= */

    const resultado = `
📊 *DATOS ENCONTRADOS*

👤 Usuario: ${nombre}
🌍 Ubicación: ${random(ciudades)}
📱 Dispositivo: ${random(dispositivos)}
🌐 Proveedor: ${random(proveedores)}
🧭 Navegador: ${random(navegadores)}
💘 Estado: ${random(estados)}
💸 Saldo: $${Math.floor(Math.random() * 500)} MXN
📂 Archivo: ${random(archivos)}
🕒 Última conexión: Hace ${Math.floor(Math.random() * 59) + 1} min
🔥 Nivel: ${Math.floor(Math.random() * 100)}%

⚠️ *DOXEO 100% FALSO — SOLO BROMA 😄*
`;

    await sock.sendMessage(from, {
        text: resultado,
        mentions: [target]
    });
}
