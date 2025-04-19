import { SafetyFilterLevel } from '@google/genai';
import { Person } from '../../api';
import { geminiAI } from '../config';
import { writeImages } from '../utils/write-images';

export async function generatePoster(firstPerson: Person, numberOfImages: number) {
  const imagePrompt = `Generate a poster of ${firstPerson.name} from Star Wars who is a ${firstPerson.gender}. 
  The eye color is ${firstPerson.eye_color}, the hair color is ${firstPerson.hair_color}, and the skin color is ${firstPerson.skin_color}.
  Include ${firstPerson.name} as the title of the poster and above the character.`;

  if (process.env.MOCK_DATA === 'true') {
    return {
      name: firstPerson.name,
      filenames: [],
    };
  }

  const response = await geminiAI.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt: imagePrompt,
    config: {
      safetyFilterLevel: SafetyFilterLevel.BLOCK_LOW_AND_ABOVE,
      numberOfImages,
      outputMimeType: 'image/png',
    },
  });

  if (!response || !response.generatedImages || response.generatedImages.length === 0) {
    throw new Error('No generated images');
  }

  const filenames = writeImages(response.generatedImages);

  return {
    name: firstPerson.name,
    filenames,
  };
}
