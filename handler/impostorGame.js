// handler/impostorGame.js

const games = {};

// Palabras base (se pueden ampliar luego)
const WORDS = [
    "balon", "tacos", "playa", "netflix", "uber",
    "escuela", "hospital", "futbol", "fiesta",
    "trabajo", "oficina", "musica", "cine",
    "viaje", "pizza", "familia", "dinero", "amigo", "perro", "gato", "libro", "telefono",
    "computadora", "cafe", "restaurante", "deporte",
    "arte", "música", "película", "juego"
];

// Crear juego
export function createGame(groupId, host) {

    if (games[groupId]) {
        return false;
    }

    games[groupId] = {
        status: "waiting",
        host,
        players: [],
        impostor: null,
        word: null,
        round: 1,
        turnIndex: 0,
        votes: {}
    };

    return true;
}

// Unirse
export function joinGame(groupId, user) {

    const game = games[groupId];

    if (!game || game.status !== "waiting") return false;

    if (game.players.includes(user)) return false;

    game.players.push(user);

    return true;
}

// Iniciar
export function startGame(groupId) {

    const game = games[groupId];

    if (!game) return null;

    if (game.players.length < 5) return null;

    const word = WORDS[Math.floor(Math.random() * WORDS.length)];

    const impostor =
        game.players[Math.floor(Math.random() * game.players.length)];

    game.word = word;
    game.impostor = impostor;
    game.status = "playing";
    game.turnIndex = 0;

    return game;
}

// Obtener turno
export function getCurrentPlayer(groupId) {

    const game = games[groupId];

    if (!game) return null;

    return game.players[game.turnIndex];
}

// Siguiente turno
export function nextTurn(groupId) {

    const game = games[groupId];

    if (!game) return null;

    game.turnIndex++;

    if (game.turnIndex >= game.players.length) {

        if (game.round === 1) {
            game.round = 2;
            game.turnIndex = 0;
        } else {
            game.status = "voting";
        }
    }

    return game;
}

// Votar
export function vote(groupId, voter, target) {

    const game = games[groupId];

    if (!game || game.status !== "voting") return false;

    game.votes[voter] = target;

    return true;
}

// Terminar
export function endGame(groupId) {

    const game = games[groupId];

    if (!game) return null;

    const counts = {};

    for (const v in game.votes) {

        const t = game.votes[v];

        counts[t] = (counts[t] || 0) + 1;
    }

    let max = 0;
    let expelled = null;

    for (const u in counts) {

        if (counts[u] > max) {
            max = counts[u];
            expelled = u;
        }
    }

    delete games[groupId];

    return { expelled, game };
}

// Obtener juego
export function getGame(groupId) {
    return games[groupId];
}
// Cancelar juego
export function cancelGame(groupId) {
    if (games[groupId]) {
        delete games[groupId];
    }
}
