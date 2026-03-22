import {
    createGame,
    startGame,
    cancelGame
} from "../handler/impostorGame.js";


export const command = "impostor";
export const adminOnly = true;
export const category = "juegos";

export async function execute(sock, msg, from) {

    // Solo grupos
    if (!from.endsWith("@g.us")) {
        return sock.sendMessage(from, {
            text: "❌ Este juego solo funciona en grupos"
        });
    }

    const ok = createGame(from, msg.key.participant);

    if (!ok) {
        return sock.sendMessage(from, {
            text: "⚠️ Ya hay una partida activa"
        });
    }

    await sock.sendMessage(from, {
        text:
            `🎮 *IMPOSTOR DE LA PALABRA*
    Laboratorio Python

Escribe:
👉 !entrar

Mínimo: 5 jugadores
Tiempo: 5 minutos para iniciar

by Charly`
    });

    // Auto inicio en 60s
    setTimeout(async () => {

        const game = startGame(from);

        if (!game) {

            cancelGame(from);

            await sock.sendMessage(from, {
                text: "❌ No hubo suficientes jugadores. Cancelado."
            });
        } else {

            // Enviar roles por privado
            for (const p of game.players) {

                if (p === game.impostor) {

                    await sock.sendMessage(p, {
                        text:
                            `😈 *Eres el IMPOSTOR*
Descubre la palabra sin delatarte`
                    });

                } else {

                    await sock.sendMessage(p, {
                        text:
                            `🧠 Tu palabra es:
*${game.word.toUpperCase()}*

No la digas directamente`
                    });
                }
            }

            // Primer turno
            await sock.sendMessage(from, {
                text:
                    `✅ Juego iniciado

🗣 Ronda 1

Empieza:
@${game.players[0].split("@")[0]}`,
                mentions: [game.players[0]]
            });
        }

    }, 300000);
}
