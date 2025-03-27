import { useState } from 'react';
import { extractAudio } from '../lib/ffmpeg';

export default function Home() {
  const [audioUrl, setAudioUrl] = useState(null);

  async function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (file) {
      const audioBlob = await extractAudio(file);
      setAudioUrl(URL.createObjectURL(audioBlob));
    }
  }

  return (
    <div>
      <h1>Витягнення аудіо з відео</h1>
      <input type="file" accept="video/mp4,video/webm" onChange={handleFileUpload} />
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
}
