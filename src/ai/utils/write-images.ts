import { GeneratedImage } from '@google/genai';
import * as fs from 'node:fs';

export function writeImages(generatedImages: GeneratedImage[]) {
  let numImages = 0;
  const filenames: string[] = [];
  if (fs.existsSync('people')) {
    fs.rmSync('people', { recursive: true });
  }
  fs.mkdirSync('people', { recursive: true });
  let idx = 1;
  for (const generatedImage of generatedImages) {
    let imageBytes = generatedImage?.image?.imageBytes;
    if (imageBytes) {
      const buffer = Buffer.from(imageBytes, 'base64');
      const filename = `people/imagen-${idx}.png`;
      fs.writeFileSync(filename, buffer);
      numImages = numImages + 1;
      filenames.push(filename);
    }
    idx = idx + 1;
  }

  return filenames;
}
