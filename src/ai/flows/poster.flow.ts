import { gemini20Flash, gemini25ProPreview0325 } from '@genkit-ai/googleai';
import { z } from 'genkit';
import { personInputSchema } from '../../api';
import { ai } from '../config';
import { imageResponseConfig } from '../constants/safety-settings.constant';
import { searchPeopleByTool } from '../search-people.util';

export const posterFlow = ai.defineFlow(
  {
    name: 'posterFlow',
    inputSchema: personInputSchema,
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async ({ name }, { sendChunk }) => {
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
    
    const response = await ai.generate({
      system: `
You are a professional artist who can design theatric posters for any Star Wars character. 
The poster prints out the text "Star Wars Franchise" and accurately shows the character's physical features.`,
      prompt: `
Design a poster for ${personName} who is a ${personGender}. 
The eye color is ${personEyeColor}, the hair color is ${personHairColor}, 
and the skin color is ${personSkinColor}`,
      output: {
        format: 'media',
      },
      config: imageResponseConfig, 
      model: gemini25ProPreview0325,
    });

    // for await (const chunk of response.stream) {
    //   sendChunk((chunk as any).text);
    // }

    // const { output: story } = await response.response;
    // if (story == null) {
    //   throw new Error("Response doesn't satisfy schema.");
    // }
    console.log(response);

    throw Error('not working');
  },
);
