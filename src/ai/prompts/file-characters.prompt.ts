import { filmCharacterResultsSchema, filmInputSchema } from '../../api';
import { ai } from '../config';
import { promptConfig } from '../constants/safety-settings.constant';
import { filmCharactersTool } from '../tools/file-characters.tool';

export const filmCharactersPrompt = ai.definePrompt(
  {
    name: 'fileCharactersPrompt',
    tools: [filmCharactersTool],
    input: {
      schema: filmInputSchema,
    },
    output: {
      format: 'json',
      schema: filmCharacterResultsSchema,
    },
    config: promptConfig,
  },
  `
Use the tools to perform a like search on "{{title}}" to find the film titles.
Then, list the characters in these Star Wars films. If there is no film found, return an empty array.
If you do not know the answer, return an empty array and do not make up any characters or films.
Please stop when a non-empty array is found.    
`,
);
