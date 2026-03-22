export default {

    mode: "general",

    steps: [

        {
            title: "ROL",
            question: "¿Qué rol debe asumir la IA?",
            examples: [
                "coach de vida",
                "ingeniero de software",
                "experto en marketing",
                "entrenador personal",
                "consultor de negocios"
            ]
        },

        {
            title: "CONTEXTO",
            question: "Describe el contexto:",
            examples: [
                "quiero empezar un negocio pequeño",
                "estoy aprendiendo programación",
                "quiero ser más productivo",
                "tengo estrés laboral",
                "quiero cambiar de carrera"
            ]
        },

        {
            title: "OBJETIVO",
            question: "¿Qué quieres lograr?",
            examples: [
                "crear un plan de estudio",
                "recibir consejos detallados",
                "organizar mi tiempo",
                "mejorar mi rendimiento",
                "tomar mejores decisiones"
            ]
        },

        {
            title: "DETALLE",
            question: "Agrega detalles importantes:",
            examples: [
                "tengo poco presupuesto",
                "no tengo experiencia",
                "tengo poco tiempo",
                "trabajo desde casa",
                "tengo familia que atender"
            ]
        },

        {
            title: "FORMATO",
            question: "¿Cómo quieres la respuesta?",
            examples: [
                "paso a paso",
                "en lista",
                "plan de acción",
                "reporte detallado",
                "checklist"
            ]
        }

    ],

    build(answers) {

        return `
Act as a professional ${answers[0]}.

Context:
${answers[1]}

Goal:
${answers[2]}

Important details:
${answers[3]}

Please respond in this format:
${answers[4]}

Provide clear, structured, and practical guidance.
`.trim();
    }
};
