import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


let ffmpeg;

export async function loadFFmpeg() {
  if (!ffmpeg) {
    const { createFFmpeg, fetchFile } = await import('@ffmpeg/ffmpeg');
    ffmpeg = createFFmpeg({ log: true });
  }
  
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
}

export async function extractAudio(videoFile, outputFormat = 'aac') {
  await loadFFmpeg();

  const inputFileName = 'input.mp4';
  const outputFileName = `output.${outputFormat}`;

  ffmpeg.FS('writeFile', inputFileName, await (await import('@ffmpeg/ffmpeg')).fetchFile(videoFile));

  await ffmpeg.run('-i', inputFileName, '-vn', '-acodec', 'copy', outputFileName);

  const data = ffmpeg.FS('readFile', outputFileName);
  return new Blob([data.buffer], { type: `audio/${outputFormat}` });
}

