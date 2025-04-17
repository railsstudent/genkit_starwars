import { GoogleGenAI, SafetyFilterLevel } from '@google/genai';
import { z } from 'genkit';
import { personInputSchema } from '../../api';
import { ai } from '../config';
import { searchPeopleByTool } from '../search-people.util';

const geminiAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export const posterFlow = ai.defineFlow(
  {
    name: 'posterFlow',
    inputSchema: personInputSchema,
    outputSchema: z.string(),
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
and the skin color is ${personSkinColor}. 
Please add the "Star Wars Franchise" on the image.`;

    console.log('imagePrompt', imagePrompt);
    
    const image = await geminiAI.models.generateImages({
      model: 'gemini-2.0-flash-exp-image-generation',
      prompt: imagePrompt,
      config: {
        safetyFilterLevel: SafetyFilterLevel.BLOCK_MEDIUM_AND_ABOVE,
        numberOfImages: 1,
        outputMimeType: 'image/png'
      }
    });

    if (!image.generatedImages) {
      throw new Error('No generated images');
    }

    if (!image.generatedImages[0].image || !image.generatedImages[0].image.imageBytes) {
      throw new Error('No image data or image bytes');
    }
    
    console.log('mimeType', image.generatedImages[0].image.mimeType);
    return image.generatedImages[0].image.imageBytes
  },
);
