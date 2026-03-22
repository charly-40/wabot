const frases = [
    "Más vale tarde que nunca 😅",
    "El que madruga… tiene sueño todo el día ☕",
    "Hoy no fío, mañana sí 😎",
    "Sin miedo al éxito 💪",
    "Modo guerrero activado 🔥",
    "Si no lo intentas, nunca lo sabrás 🤔",
    "A veces hay que arriesgar para ganar 🎲",
    "El éxito es la mejor venganza 😈",
    "No sueñes tu vida, vive tu sueño 🌟",
    "El que persevera, alcanza 🏆",
    "La vida es una aventura, disfrútala 🚀",
    "El fracaso es solo un paso hacia el éxito 💡",
    "No dejes para mañana lo que puedes hacer hoy ⏰",
    "El éxito no es para los que piensan en pequeño 🌍",
    "Si quieres algo, ve por ello sin miedo 🏹",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día 📈",
    "No te rindas, cada fracaso es una oportunidad para empezar de nuevo con más experiencia 💪",
    "El éxito es la mejor venganza contra los que dudaron de ti 😎",
    "La vida es demasiado corta para no perseguir tus sueños 🌈",
    "El éxito no es para los que se conforman con poco, sino para los que luchan por lo que quieren 💥",
    "Si quieres algo, ve por ello sin miedo, porque el miedo es el mayor enemigo del éxito 😱",
    "Si los perros ladran, es porque vamos avanzando 🐶",
    "Quienes hablan a mi espalda, es porque estoy por delante 🏃‍♂️"
];

export const command = "frase";
export const category = "utilidad";

export async function execute(sock, msg, from) {

    const f = frases[Math.floor(Math.random() * frases.length)];

    await sock.sendMessage(from, {
        text: `💬 ${f}`
    });
}
