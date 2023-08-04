import ytdl from "ytdl-core";
export default class Youtube {
    video(url: string, filter: ytdl.Filter, quality?: ytdl.ChooseFormatQuality, outputDirectory?: string): Promise<void>;
    playlist(url: string, filter: ytdl.Filter, quality?: ytdl.ChooseFormatQuality, outputDirectory?: string): Promise<void>;
}
