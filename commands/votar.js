import {
    vote,
    endGame,
    getGame
} from "../handler/impostorGame.js";

export const command = "votar";
export const category = "juegos";

export async function execute(sock, msg, from, args) {

    if (!from.endsWith("@g.us")) return;

    const game = getGame(from);

    if (!game || game.status !== "voting") {
        return sock.sendMessage(from, {
            text: "❌ No hay votación activa"
        });
    }

    const voter = msg.key.participant;

    if (game.votes[voter]) {
        return sock.sendMessage(from, {
            text: "⚠️ Ya votaste"
        });
    }

    if (!args[0] || !args[0].includes("@")) {
        return sock.sendMessage(from, {
            text: "❌ Usa: !votar @usuario"
        });
    }

    const target =
        args[0].replace("@", "") + "@s.whatsapp.net";

    const ok = vote(from, voter, target);

    if (!ok) {
        return sock.sendMessage(from, {
            text: "❌ Error al votar"
        });
    }

    await sock.sendMessage(from, {
        text: `🗳 Voto de @${voter.split("@")[0]} registrado`,
        mentions: [voter]
    });

    // ¿Todos votaron?
    const players = game.players.length;
    const votes = Object.keys(game.votes).length;

    if (votes < players) return;

    // Terminar
    const result = endGame(from);

    const expelled = result.expelled;
    const impostor = result.game.impostor;
    const word = result.game.word;

    let text = "";

    if (expelled === impostor) {

        text =
`🎉 *GANÓ LA TRIPULACIÓN*

😈 Impostor: @${impostor.split("@")[0]}
🧠 Palabra: ${word}`;

    } else {

        text =
`😈 *GANÓ EL IMPOSTOR*

🧠 Era: ${word}
😎 Impostor: @${impostor.split("@")[0]}`;
    }

    await sock.sendMessage(from, {
        text,
        mentions: [impostor]
    });
}
