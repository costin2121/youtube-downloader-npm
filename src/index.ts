import ytdl from "ytdl-core";
import yts from "yt-search";
import fs, { PathLike } from "fs";
import path from "path";

export default class Youtube {
  async video(
    url: string,
    filter: ytdl.Filter,
    quality: ytdl.ChooseFormatQuality = "highest",
    outputDirectory?: string
  ) {
    if (!ytdl.validateURL(url)) throw new Error("Invalid video url");

    let videoInfo = await yts({
      videoId: url.split("v=")[1].split("&")[0],
    });
    let dl = ytdl(url, {
      filter: filter,
      quality: quality,
    });

    let ext = ["audioandvideo", "videoandaudio", "video", "videoonly"].includes(
      filter.toString()
    )
      ? "mp4"
      : "mp3";

    if (outputDirectory != undefined && !fs.existsSync(outputDirectory))
      fs.mkdirSync(outputDirectory);

    let stream = fs.createWriteStream(
      path.join(
        outputDirectory || "./",
        `./${videoInfo.title.replaceAll("/", "-")}.${ext}`
      )
    );
    dl.pipe(stream);
  }

  async playlist(
    url: string,
    filter: ytdl.Filter,
    quality: ytdl.ChooseFormatQuality = "highest",
    outputDirectory?: string
  ) {
    if (
      !url.startsWith("https://youtube.com/playlist") &&
      !url.includes("list=")
    )
      return;

    let id = url.split("list=")[1].split("&")[0];

    let playlist = await yts({
      listId: id,
    });

    for (const video of playlist.videos) {
      let videoInfo = await yts({
        videoId: video.videoId,
      });
      await this.video(
        videoInfo.url,
        filter,
        quality,
        `${outputDirectory || "./"}/${playlist.title.replaceAll(/ \//g, "-")}`
      );
    }
  }
}
