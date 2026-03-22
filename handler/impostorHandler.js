import {
    getGame,
    nextTurn,
    getCurrentPlayer
} from "./impostorGame.js";

export async function handleGameMessage(sock, msg, text, from) {

    if (!from.endsWith("@g.us")) return;

    const game = getGame(from);

    if (!game) return;

    const user = msg.key.participant;

    // Solo cuando está jugando
    if (game.status !== "playing") return;

    const current = getCurrentPlayer(from);

    // No es su turno
    if (user !== current) return;

    // Prohibir palabra literal
    if (
        game.word &&
        text.toLowerCase().includes(game.word)
    ) {

        await sock.sendMessage(from, {
            text: `⚠️ @${user.split("@")[0]} dijo la palabra. Eliminado.`,
            mentions: [user]
        });

        game.status = "ended";
        return;
    }

    // Avanzar turno
    const g = nextTurn(from);

    // Entró a votación
    if (g.status === "voting") {

        await sock.sendMessage(from, {
            text:
`🗳 *VOTACIÓN*

Usen:
!votar @usuario`
        });

    } else {

        const next = getCurrentPlayer(from);

        await sock.sendMessage(from, {
            text: `👉 Turno de @${next.split("@")[0]}`,
            mentions: [next]
        });
    }
}
