import { peopleSchema, personInputSchema, searchPeople } from '../../api';
import { ai } from '../config';

export const peopleTool = ai.defineTool(
  {
    name: 'peopleTool',
    description: 'Use this tool to perform a like search on Star Wars people and returm the results in JSON format.',
    inputSchema: personInputSchema,
    outputSchema: peopleSchema,
  },
  async ({ name }) => {
    console.log(`peopleTool called with name: ${name}`);
    return searchPeople(name);
  },
);
