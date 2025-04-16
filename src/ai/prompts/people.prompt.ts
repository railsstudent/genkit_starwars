import { peopleSchema, personInputSchema } from '../../api';
import { ai } from '../config';
import { promptConfig } from '../constants/safety-settings.constant';
import { peopleTool } from '../tools/people.tool';

export const peoplePrompt = ai.definePrompt(
  {
    name: 'peoplePrompt',
    tools: [peopleTool],
    input: {
      schema: personInputSchema,
    },
    output: {
      format: 'json',
      schema: peopleSchema,
    },
    config: promptConfig,
    model: 'googleai/gemini-2.0-flash',
    // toolChoice: 'required'
  },
  `
Use the tools to perform a like search on "{{name}}" to find the characters.
If there is no character found, return an empty array.
If you do not know the answer, return an empty array and do not make up any characters.
    `,
);
