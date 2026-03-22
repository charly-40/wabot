export default {

    mode: "tecnico",

    steps: [

        {
            title: "ROL EXPERTO",
            question: "¿Qué tipo de especialista debe ser la IA?",
            examples: [
                "mecánico especializado en Voyager 1998-2000",
                "electricista automotriz",
                "técnico en motores diésel",
                "especialista en aire acondicionado automotriz",
                "ingeniero eléctrico industrial"
            ]
        },

        {
            title: "PROBLEMA",
            question: "Describe el problema principal:",
            examples: [
                "no funcionan los limpiadores ni direccionales",
                "el motor se apaga en caliente",
                "la batería se descarga sola",
                "la transmisión patina",
                "se prende el foco del ABS"
            ]
        },

        {
            title: "SÍNTOMAS",
            question: "¿Qué síntomas presenta?",
            examples: [
                "no hace ningún sonido",
                "funciona a veces",
                "falla cuando llueve",
                "solo falla en carretera",
                "se apaga de repente"
            ]
        },

        {
            title: "REVISADO",
            question: "¿Qué ya revisaste o cambiaste?",
            examples: [
                "revisé fusibles y relevadores",
                "cambié la batería",
                "revisé el alternador",
                "limpié tierras",
                "reemplacé sensores"
            ]
        },

        {
            title: "TIPO DE RESPUESTA",
            question: "¿Qué tipo de ayuda quieres?",
            examples: [
                "diagnóstico paso a paso",
                "fallas más comunes",
                "explicación del cableado",
                "cómo repararlo",
                "costo aproximado"
            ]
        }

    ],

    build(answers) {

        return `
Act as a professional ${answers[0]}.

Problem:
${answers[1]}

Symptoms:
${answers[2]}

Already checked:
${answers[3]}

Please provide:
${answers[4]}

Include:
- Possible root causes
- Diagnostic steps
- Safety precautions
- Common failure points
- Repair recommendations
`.trim();
    }
};
