import { Sticker, StickerTypes } from "wa-sticker-formatter";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";
import fs from "fs";

export const command = "sticker";
export const category = "multimedia";

async function streamToBuffer(stream) {

    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
}

export async function execute(sock, msg, from) {

    let message = null;
    let type = null;

    // Imagen directa
    if (msg.message.imageMessage) {
        message = msg.message.imageMessage;
        type = "image";
    }

    // Video directo
    if (msg.message.videoMessage) {
        message = msg.message.videoMessage;
        type = "video";
    }

    // Respuesta
    const quoted =
        msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (quoted?.imageMessage) {
        message = quoted.imageMessage;
        type = "image";
    }

    if (quoted?.videoMessage) {
        message = quoted.videoMessage;
        type = "video";
    }

    if (!message) {
        return sock.sendMessage(from, {
            text: "❌ Responde a una imagen o video con !sticker"
        });
    }

    // Descargar contenido
    const stream = await downloadContentFromMessage(message, type);

    const buffer = await streamToBuffer(stream);

    if (!buffer || !buffer.length) {
        return sock.sendMessage(from, {
            text: "❌ No se pudo leer el archivo"
        });
    }

    const sticker = new Sticker(buffer, {
        pack: "Wabot Charly",
        author: "Atlas 🤖",
        type: StickerTypes.FULL,
        quality: 70
    });

    const stickerBuffer = await sticker.toBuffer();

    await sock.sendMessage(from, {
        sticker: stickerBuffer
    });
}
