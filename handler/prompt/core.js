const sessions = {};

export function startSession(user, module) {

    sessions[user] = {
        step: 0,
        module,
        answers: []
    };
}

export function hasSession(user) {
    return sessions[user];
}

export function endSession(user) {
    delete sessions[user];
}

export function handleInput(user, text) {

    const session = sessions[user];
    if (!session) return null;

    const mod = session.module;
    const step = session.step;

    session.answers.push(text);

    // Si aún hay pasos
    if (step < mod.steps.length) {

        session.step++;

        if (session.step < mod.steps.length) {

            return formatQuestion(mod.steps[session.step]);
        }
    }

    // Terminar
    const result = mod.build(session.answers);

    delete sessions[user];

    return {
        done: true,
        result
    };
}

export function getFirstQuestion(module) {
    return formatQuestion(module.steps[0]);
}

/* ===== Helpers ===== */

function formatQuestion(step) {

    let msg = `🧠 *${step.title}*\n\n${step.question}\n\n`;

    if (step.examples?.length) {

        msg += "Ejemplos:\n";

        for (const e of step.examples) {
            msg += `• ${e}\n`;
        }
    }

    return msg;
}
