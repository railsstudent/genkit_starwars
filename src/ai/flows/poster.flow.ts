import { SafetyFilterLevel } from '@google/genai';
import { z } from 'genkit';
import { personInputSchema } from '../../api';
import { ai, geminiAI } from '../config';
import { searchPeopleByTool } from '../search-people-by-tool';

export const posterFlow = ai.defineFlow(
  {
    name: 'posterFlow',
    inputSchema: personInputSchema,
    // outputSchema: z.string(),
  },
  async ({ name }) => {
    const output = await searchPeopleByTool(name);

    if (output.length === 0) {
      throw new Error('No people found');
    }

    const firstPerson = output[0];
    const personName = firstPerson.name;
    const personGender = firstPerson.gender;
    const personHairColor = firstPerson.hair_color;
    const personSkinColor = firstPerson.skin_color;
    const personEyeColor = firstPerson.eye_color;

    const imagePrompt = `Generate an image for ${personName} who is a ${personGender}. 
The eye color is ${personEyeColor}, the hair color is ${personHairColor}, 
and the skin color is ${personSkinColor}.`;

    console.log('imagePrompt', imagePrompt);

    // ai.generate({
    //   // model: 'imagen-3.0-generate-002',
    //   prompt: imagePrompt
    // })

    const image = await geminiAI.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: imagePrompt,
      config: {
        safetyFilterLevel: SafetyFilterLevel.BLOCK_LOW_AND_ABOVE,
        numberOfImages: 1,
        outputMimeType: 'image/png',
      },
    });

    if (!image || !image.generatedImages || image.generatedImages.length === 0) {
      throw new Error('No generated images');
    }

    console.log('size', image.generatedImages.length);

    if (!image.generatedImages[0].image || !image.generatedImages[0].image?.imageBytes) {
      throw new Error('No image data or image bytes');
    }

    return 'ok';
    // return image.generatedImages[0].image.imageBytes;
  },
);
