const sessions = {};

const styles = {
    "1": "Photorealistic RAW photo",
    "2": "Anime illustration",
    "3": "Cinematic digital painting",
    "4": "Ultra detailed 3D render",
    "5": "Fantasy concept art",
    "6": "Cyberpunk futuristic art",
    "7": "Dark gothic illustration"
};

/* ================= UTILS ================= */

function enhance(text) {

    return text
        .replace(/chica/gi, "young woman")
        .replace(/chico/gi, "young man")
        .replace(/niña/gi, "girl")
        .replace(/niño/gi, "boy")
        .replace(/bonita/gi, "beautiful")
        .replace(/guapo/gi, "handsome")
        .replace(/lindo/gi, "cute")
        .replace(/oscuro/gi, "dark")
        .replace(/brillante/gi, "bright")
        .replace(/realista/gi, "realistic");
}

/* ================= CORE ================= */

export function startWizard(user, mode = "normal") {

    sessions[user] = {
        step: 1,
        mode,
        data: {}
    };
}

export function cancelWizard(user) {
    delete sessions[user];
}

export function hasSession(user) {
    return sessions[user];
}

export function handleWizardInput(user, text) {

    const session = sessions[user];
    if (!session) return null;

    const step = session.step;
    const mode = session.mode;

    const input =
        mode === "pro" ? enhance(text) : text;

    /* ================= STEPS ================= */

    // 1️⃣ ESTILO
    if (step === 1) {

        session.data.style = styles[text] || input;
        session.step++;

        return `👤 SUJETO
Describe persona/personaje:

Ej:
• young woman, long hair, hoodie, glasses
• old man, beard, suit, serious face
• cyberpunk girl, neon jacket, tattoos
`;
    }

    // 2️⃣ SUJETO
    if (step === 2) {

        session.data.subject = input;
        session.step++;

        return `🎭 ACCIÓN / POSE

Ej:
• sitting on chair
• walking in rain
• looking at camera
• holding sword
• jumping in air
`;
    }

    // 3️⃣ ACCIÓN
    if (step === 3) {

        session.data.action = input;
        session.step++;

        return `🌍 ESCENARIO / LUGAR

Ej:
• bedroom at night
• cyberpunk city street
• forest in fog
• space station
• abandoned building
`;
    }

    // 4️⃣ ESCENARIO
    if (step === 4) {

        session.data.environment = input;
        session.step++;

        return `💡 ILUMINACIÓN

Ej:
• soft light
• golden hour
• neon lights
• rim light
• studio lighting
• volumetric light
`;
    }

    // 5️⃣ LUZ
    if (step === 5) {

        session.data.lighting = input;
        session.step++;

        return `📷 CÁMARA / LENTE

Ej:
• 35mm lens
• 50mm portrait lens
• fisheye lens
• Canon DSLR
• Sony Alpha
• close-up
• wide angle
• depth of field
• bokeh background
`;
    }

    // 6️⃣ CÁMARA
    if (step === 6) {

        session.data.camera = input;
        session.step++;

        return `✨ ESTÉTICA / MOOD

Ej:
• cinematic
• dramatic
• dreamy
• dark moody
• vibrant colors
• soft pastel
• retro style
• vaporwave
• minimalist
• surreal
`;
    }

    // 7️⃣ ESTÉTICA
    if (step === 7) {

        session.data.mood = input;
        session.step++;

        return `⚠️ ELEMENTOS A EVITAR

Ej:
• blurry
• bad hands
• watermark
• text
• low quality
• deformed face
• extra fingers
`;
    }

    // 8️⃣ NEGATIVOS / FINAL
    if (step === 8) {

        session.data.negative = input;

        const d = session.data;

        const quality =
            mode === "pro"
                ? "masterpiece, best quality, ultra highres, RAW photo, global illumination, octane render"
                : "high quality, detailed";

        const prompt = `
${d.style},
${d.subject},
${d.action},
${d.environment},
${d.lighting},
${d.camera},
${d.mood},
${quality},
((ultra detailed)),
(sharp focus:1.3),
(cinematic lighting:1.4)
`.trim();

        const negative = `
${d.negative},
worst quality,
lowres,
jpeg artifacts,
bad anatomy,
bad hands,
extra fingers,
mutated limbs,
deformed,
watermark,
text,
cropped
`.trim();

        delete sessions[user];

        return {
            done: true,
            prompt,
            negative
        };
    }

    return null;
}
