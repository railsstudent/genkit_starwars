import { peopleSchema, personInputSchema, searchPeople } from '../api';
import { ai } from './config';

export const peopleTool = ai.defineTool({
    name: 'peopleTool',
    description: 'use this tool to try to search a Star Wars character',
    inputSchema: personInputSchema,
    outputSchema: peopleSchema,
  },
  async ({ name }) => {
    console.log('peopleTool -> name', name);
    const results = await searchPeople(name);
    return results;
  });

// export const filmCharactersTool = ai.defineTool({
//     name: 'filmCharactersTool',
//     description: 'use this tool to try to find the characters in matching Star Wars films',
//     inputSchema: filmInputSchema,
//     outputSchema: filmCharacterResultsSchema,
//   },
//   async ({ key }) => {
//     console.log('filmCharactersTool -> key', key);
//     const results = await searchCharactersInFilm(key);
//     console.log('results', results);
//     return results;
//   });  