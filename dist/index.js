"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const yt_search_1 = __importDefault(require("yt-search"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Youtube {
    async video(url, filter, quality = "highest", outputDirectory) {
        if (!ytdl_core_1.default.validateURL(url))
            throw new Error("Invalid video url");
        let videoInfo = await (0, yt_search_1.default)({
            videoId: url.split("v=")[1].split("&")[0],
        });
        let dl = (0, ytdl_core_1.default)(url, {
            filter: filter,
            quality: quality,
        });
        let ext = ["audioandvideo", "videoandaudio", "video", "videoonly"].includes(filter.toString())
            ? "mp4"
            : "mp3";
        if (outputDirectory != undefined && !fs_1.default.existsSync(outputDirectory))
            fs_1.default.mkdirSync(outputDirectory);
        console.log(videoInfo.title.match(/ \//));
        console.log(videoInfo.title.match(/ \//g));
        let stream = fs_1.default.createWriteStream(path_1.default.join(outputDirectory || "./", `./${videoInfo.title.replaceAll("/", "-")}.${ext}`));
        dl.pipe(stream);
    }
    async playlist(url, filter, quality = "highest", outputDirectory) {
        if (!url.startsWith("https://youtube.com/playlist") &&
            !url.includes("list="))
            return;
        let id = url.split("list=")[1].split("&")[0];
        let playlist = await (0, yt_search_1.default)({
            listId: id,
        });
        for (const video of playlist.videos) {
            let videoInfo = await (0, yt_search_1.default)({
                videoId: video.videoId,
            });
            await this.video(videoInfo.url, filter, quality, `${outputDirectory || "./"}/${playlist.title.replaceAll(/ \//g, "-")}`);
        }
    }
}
exports.default = Youtube;
let yt = new Youtube();
async function m() {
    await yt.playlist("https://www.youtube.com/playlist?list=PL2xsJowpDh_A2pG95Daju4kG0C1aDm8Ti", "videoandaudio", "highestvideo");
}
m();
