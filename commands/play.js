import { exec } from "child_process";
import fs from "fs";
import yts from "yt-search";

export const command = "play";
export const category = "multimedia";

export async function execute(sock, msg, from, args) {

    if (!args.length) {
        return sock.sendMessage(from, {
            text: "❌ Usa: !play nombre canción"
        });
    }

    const query = args.join(" ");

    const search = await yts(query);

    if (!search.videos.length) {
        return sock.sendMessage(from, { text: "❌ No encontrado" });
    }

    const video = search.videos[0];

    const file = `./temp/${Date.now()}.mp3`;

    await sock.sendMessage(from, {
        text:
`🎵 *${video.title}*
👤 ${video.author.name}
⏱ ${video.timestamp}
👁 ${video.views}

📥 Descargando audio...`
    });

    const cmd =
`"${process.cwd()}\\yt-dlp.exe" -x --audio-format mp3 -o "${file}" "${video.url}"`;

    exec(cmd, async (err) => {

        if (err) {
            console.error(err);

            return sock.sendMessage(from, {
                text: "❌ Error al descargar audio"
            });
        }

        await sock.sendMessage(from, {
            audio: fs.readFileSync(file),
            mimetype: "audio/mpeg"
        });

        fs.unlinkSync(file);
    });
}
