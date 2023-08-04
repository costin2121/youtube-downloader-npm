# Youtube Downloader

## An easy and quick way to download youtube videos/playlists

## Installation

**- First you may need to install ffmpeg.**

```
npm i @cxstin/ytdl
```

## Usage

### Downloading Videos

```js
const ytdl = require("@cxstin/ytdl");

// Download the video as an mp4 file with video and audio.
// The video quality will be better than the audio since we use "highestvideo" as our quality parameter
ytdl.video(
  "https://www.youtube.com/watch?v=Hcoe-AHk4uE",
  "videoandaudio",
  "highestvideo"
);
```

### Downloading Playlists

**- THE PLAYLIST YOU ARE DOWNLOADING NEEDS TO BE EITHER PUBLIC OR UNLISTED, IT WILL NOT WORK IF ITS PRIVATE**

```js
const ytdl = require("@cxstin/ytdl");

// This will create a new directory with the playlist's name and will download all the videos it contains into that directory.
ytdl.playlist(
  "https://www.youtube.com/playlist?list=PL2xsJowpDh_Czfwzj6DU7XHOYgQ-g_-kn",
  "videoandaudio",
  "highestvideo"
);
```
