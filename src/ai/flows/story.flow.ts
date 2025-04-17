import { gemini20Flash } from '@genkit-ai/googleai';
import { z } from 'genkit';
import { personInputSchema } from '../../api';
import { ai } from '../config';
import { responseConfig } from '../constants/response-config.constant';
import { searchPeopleByTool } from '../search-people-by-tool';

export const storyFlow = ai.defineFlow(
  {
    name: 'storyFlow',
    inputSchema: personInputSchema,
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async ({ name }, { sendChunk }) => {
    const output = await searchPeopleByTool(name);

    if (output.length === 0) {
      return '';
    }

    const names = output.map((person) => person.name).join(',');

    const response = await ai.generateStream({
      system: `
You are a professional Star Wars writer who can write Star Wars fictions based on the characters. 
Please keep the story to maximum 1000 characters.`,
      prompt: `Write a Star Wars fiction about ${names}.`,
      output: {
        format: 'text',
        schema: z.string(),
      },
      config: responseConfig,
      model: gemini20Flash,
    });

    for await (const chunk of response.stream) {
      sendChunk((chunk as any).text);
    }

    const { output: story } = await response.response;
    if (story == null) {
      throw new Error("Response doesn't satisfy schema.");
    }

    return story;
  },
);
