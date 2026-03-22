import { exec } from "child_process";
import fs from "fs";
import yts from "yt-search";

export const command = "video";
export const category = "multimedia";

export async function execute(sock, msg, from, args) {

    if (!args.length) {
        return sock.sendMessage(from, {
            text: "❌ Usa: !video nombre video"
        });
    }

    const query = args.join(" ");

    const search = await yts(query);

    if (!search.videos.length) {
        return sock.sendMessage(from, { text: "❌ No encontrado" });
    }

    const video = search.videos[0];

    const file = `./temp/${Date.now()}.mp4`;

    await sock.sendMessage(from, {
        text:
`🎬 *${video.title}*
👤 ${video.author.name}
⏱ ${video.timestamp}
👁 ${video.views}

📥 Descargando video...`
    });

    const cmd =
`"${process.cwd()}\\yt-dlp.exe" -f mp4 -o "${file}" "${video.url}"`;

    exec(cmd, async (err) => {

        if (err) {
            console.error(err);

            return sock.sendMessage(from, {
                text: "❌ Error al descargar video"
            });
        }

        await sock.sendMessage(from, {
            video: fs.readFileSync(file),
            mimetype: "video/mp4"
        });

        fs.unlinkSync(file);
    });
}
