const retos = [
    "Manda un audio cantando 🎤",
    "Sube una foto ahorita 📸",
    "Etiqueta a tu crush 😏",
    "Cuenta un secreto 🤫",
    "Invita las chelas 🍻",
    "Haz 10 flexiones 💪",
    "Baila por 30 segundos 🕺",
    "Escribe tu canción favorita 🎶",
    "Comparte tu meme favorito 😂",
    "Dile a alguien que lo quieres ❤️",
    "Haz una imitación de alguien famoso 🎭",
    "Cuenta un chiste 🤡",
    "Envía un mensaje de voz diciendo algo bonito 🗣️",
    "Publica una foto de tu comida 🍔",
    "Haz una confesión 😳",
    "Comparte tu lugar favorito en la ciudad 🏙️",
    "Dile a alguien que es tu mejor amigo/a 👯",
    "Publica una foto de tu mascota 🐾",
    "Haz un dibujo y compártelo 🎨",
    "Envía un mensaje de voz diciendo tu frase favorita 🗣️",
    "Comparte tu canción favorita del momento 🎧",
    "Publica una foto de tu outfit del día 👗",
    "Haz un video bailando tu canción favorita 🎥",
    "Dile a alguien que es especial para ti 🌟",
    "Comparte tu lugar soñado para vacacionar 🏝️",
    "Publica una foto de tu lugar favorito en tu casa 🏡",
    "Haz un video haciendo tu mejor imitación de un animal 🐒",
    "Dile a alguien que lo admiras por algo que hizo 👏",
    "Comparte tu película favorita 🎬",
    "Publica una foto de tu comida favorita 🍕",
    "Haz un video contando tu mejor chiste 🤣",
    "Dile a alguien que es un gran amigo/a y por qué 👬",
    "Comparte tu libro favorito 📚",
    "Publica una foto de tu lugar favorito para relajarte 🧘"
];

export const command = "reto";
export const category = "juegos";

export async function execute(sock, msg, from) {

    const r = retos[Math.floor(Math.random() * retos.length)];

    await sock.sendMessage(from, {
        text: `🔥 Reto: ${r}`
    });
}
