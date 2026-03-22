const verdades = [
    "¿A quién extrañas en secreto? 🤫",
    "¿Cuál fue tu peor oso? 🐻",
    "¿A quién le debes dinero? 💸",
    "¿Con quién saldrías del grupo? 😅",
    "¿Qué te gustaría cambiar de ti mismo? 🔄",
    "¿Te has masturbado hoy? 😳",
    "¿Has stalkeado a alguien aquí? 👀",
    "¿Cuál es tu fantasía más loca? 😈",
    "¿Alguna vez has mentido para salir de un compromiso? 🤥",
    "¿Cuál es tu mayor miedo? 😱",
    "¿Has tenido un crush con alguien del grupo? 😏",
    "¿Cuál es tu secreto más vergonzoso? 😳",
    "¿Alguna vez has sido infiel? 💔",
    "¿Cuál es tu mayor arrepentimiento? 😔",
    "¿Has fingido estar enfermo para no ir a un evento? 🤒",
    "¿Cuál es tu mayor fantasía sexual? 🔥",
    "¿Alguna vez has tenido un sueño raro con alguien del grupo? 🌙",
    "¿Cuál es tu mayor secreto que nadie sabe? 🤐",
    "¿Has tenido un crush con alguien que no deberías? 😬",
    "¿Cuál es tu mayor inseguridad? 😟",
    "¿Alguna vez has dicho un secreto que te prometieron guardar? 🤭",
    "¿Cuál es tu mayor locura que has hecho por amor? 💘",
    "¿Has tenido un crush con alguien que no te corresponde? 😢",
    "¿Cuál es tu mayor secreto que te gustaría compartir? 🤫"
];

export const command = "verdad";
export const category = "juegos";

export async function execute(sock, msg, from) {

    const v = verdades[Math.floor(Math.random() * verdades.length)];

    await sock.sendMessage(from, {
        text: `😏 Verdad: ${v}`
    });
}
