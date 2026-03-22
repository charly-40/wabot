export default {

    mode: "creativo",

    steps: [

        {
            title: "ROL CREATIVO",
            question: "¿Qué tipo de creador debe ser la IA?",
            examples: [
                "escritor de ciencia ficción",
                "guionista de películas",
                "poeta romántico",
                "copywriter publicitario",
                "creador de historias virales"
            ]
        },

        {
            title: "TEMA",
            question: "¿Sobre qué debe tratar la historia o contenido?",
            examples: [
                "viajes en el tiempo",
                "amor imposible",
                "terror psicológico",
                "superhéroes urbanos",
                "mundo postapocalíptico"
            ]
        },

        {
            title: "ESTILO",
            question: "¿Qué estilo debe tener?",
            examples: [
                "oscuro y dramático",
                "divertido y ligero",
                "épico y cinematográfico",
                "realista",
                "filosófico"
            ]
        },

        {
            title: "FORMATO",
            question: "¿En qué formato lo quieres?",
            examples: [
                "cuento corto",
                "guion",
                "letra de canción",
                "monólogo",
                "historia para redes sociales"
            ]
        },

        {
            title: "PÚBLICO",
            question: "¿Para qué público va dirigido?",
            examples: [
                "niños",
                "adolescentes",
                "adultos",
                "todo público",
                "fans de ciencia ficción"
            ]
        }

    ],

    build(answers) {

        return `
Act as a professional ${answers[0]}.

Create creative content with the following characteristics:

Topic:
${answers[1]}

Style:
${answers[2]}

Format:
${answers[3]}

Target audience:
${answers[4]}

Focus on originality, emotional impact, and high-quality storytelling.
Avoid clichés and generic writing.
`.trim();
    }
};
