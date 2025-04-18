import { GeneratedImage, SafetyFilterLevel } from '@google/genai';
import { z } from 'genkit';
import * as fs from "node:fs";
import { personInputSchema } from '../../api';
import { ai, geminiAI } from '../config';
import { searchPeopleByTool } from '../search-people-by-tool';
import { logger } from 'genkit/logging';

function writeImages(generatedImages: GeneratedImage[]) {
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
      const buffer = Buffer.from(imageBytes, "base64");
      const filename = `people/imagen-${idx}.png`;
      fs.writeFileSync(filename, buffer);
      numImages = numImages + 1;
      filenames.push(filename);
    }
    idx = idx + 1;
  }

  return filenames;
}

export const posterFlow = ai.defineFlow(
  {
    name: 'posterFlow',
    inputSchema: personInputSchema,
    outputSchema: z.object({
      name: z.string(),
      filenames: z.array(z.string()),
    }),
  },
  async ({ name }) => {
    const output = await searchPeopleByTool(name);

    if (output.length === 0) {
      throw new Error('No people found');
    }

    const firstPerson = output[0];
    const imagePrompt = `Generate a poster of ${firstPerson.name} from Star Wars who is a ${firstPerson.gender}. 
  The eye color is ${firstPerson.eye_color}, the hair color is ${firstPerson.hair_color}, and the skin color is ${firstPerson.skin_color}.
  Include ${firstPerson.name} as the title of the poster and above the character.`;

    logger.info(imagePrompt);

    const response = await geminiAI.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: imagePrompt,
      config: {
        safetyFilterLevel: SafetyFilterLevel.BLOCK_LOW_AND_ABOVE,
        numberOfImages: 2,
        outputMimeType: 'image/png',
      },
    });

    if (!response || !response.generatedImages || response.generatedImages.length === 0) {
      throw new Error('No generated images');
    }

    const filenames = writeImages(response.generatedImages);
    
    return {
      name: firstPerson.name,
      filenames
    };
  },
);
