import { joinGame, getGame } from "../handler/impostorGame.js";

export const command = "entrar";
export const category = "juegos";

export async function execute(sock, msg, from) {

    if (!from.endsWith("@g.us")) return;

    const user = msg.key.participant;

    const game = getGame(from);

    if (!game) {
        return sock.sendMessage(from, {
            text: "❌ No hay partida activa"
        });
    }

    if (game.status !== "waiting") {
        return sock.sendMessage(from, {
            text: "⚠️ La partida ya inició"
        });
    }

    const ok = joinGame(from, user);

    if (!ok) {
        return sock.sendMessage(from, {
            text: "⚠️ Ya estás registrado"
        });
    }

    await sock.sendMessage(from, {
        text: `✅ @${user.split("@")[0]} se unió`,
        mentions: [user]
    });
}
