import { filmCharacterResultsSchema, filmInputSchema, searchCharactersInFilm } from '../../api';
import { ai } from '../config';

export const filmCharactersTool = ai.defineTool({
    name: 'filmCharactersTool',
    description: 'use this tool to try to find the characters in matching Star Wars films',
    inputSchema: filmInputSchema,
    outputSchema: filmCharacterResultsSchema,
  },
  async ({ key }) => searchCharactersInFilm(key)
);  
