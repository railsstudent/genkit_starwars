import { filmCharacterResultsSchema, filmInputSchema, searchCharactersInFilm } from '../../api';
import { ai } from '../config';

export const filmCharactersTool = ai.defineTool(
  {
    name: 'filmCharactersTool',
    description: `
        Use this tool to perform like search on the film title 
        and then returns both the title and the characters in these films.
    `,
    inputSchema: filmInputSchema,
    outputSchema: filmCharacterResultsSchema,
  },
  async ({ title }) => {
    console.log('filmCharactersTool ->', title);
    return searchCharactersInFilm(title);
  },
);
