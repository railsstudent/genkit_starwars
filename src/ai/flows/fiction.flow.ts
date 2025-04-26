import { UserFacingError, z } from 'genkit';
import { personInputSchema } from '../../api';
import { ai } from '../config';
import { responseConfig } from '../constants/response-config.constant';
import { searchPeopleByTool } from '../utils/search-people-by-tool';

export const fictionFlow = ai.defineFlow(
  {
    name: 'fictionFlow',
    inputSchema: personInputSchema,
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async ({ name }, { sendChunk, context }) => {
    if (!context?.auth) {
      throw new UserFacingError('UNAUTHENTICATED', 'Unathenticated.');
    }

    if (context?.auth?.name !== 'Rebellion') {
      throw new UserFacingError('PERMISSION_DENIED', 'Permission denied.');
    }

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
    });

    for await (const chunk of response.stream) {
      sendChunk((chunk as any).text);
    }

    const { output: fiction } = await response.response;
    if (fiction == null) {
      throw new Error("Response doesn't satisfy schema.");
    }

    return fiction;
  },
);
