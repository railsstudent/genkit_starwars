import { z } from 'genkit';
import { personInputSchema } from '../../api';
import { ai } from '../config';
import { generatePoster, searchPeopleByTool } from '../utils';

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

    if (output.length === 1) {
      return generatePoster(output[0],  1, true);
    }
    

    // ask user the choose
  //   const choices = output.map((person, index) => ({
  //     name: person.name,
  //     index: index + 1,
  //   }));

  //   const firstPerson = output[0];
  //   const imagePrompt = `Generate a poster of ${firstPerson.name} from Star Wars who is a ${firstPerson.gender}. 
  // The eye color is ${firstPerson.eye_color}, the hair color is ${firstPerson.hair_color}, and the skin color is ${firstPerson.skin_color}.
  // Include ${firstPerson.name} as the title of the poster and above the character.`;

  //   logger.info(imagePrompt);

  //   const response = await geminiAI.models.generateImages({
  //     model: 'imagen-3.0-generate-002',
  //     prompt: imagePrompt,
  //     config: {
  //       safetyFilterLevel: SafetyFilterLevel.BLOCK_LOW_AND_ABOVE,
  //       numberOfImages: 2,
  //       outputMimeType: 'image/png',
  //     },
  //   });

  //   if (!response || !response.generatedImages || response.generatedImages.length === 0) {
  //     throw new Error('No generated images');
  //   }

  //   const filenames = writeImages(response.generatedImages);
    
    return {
      name: 'hello',
      filenames: [],
    };
  },
);
