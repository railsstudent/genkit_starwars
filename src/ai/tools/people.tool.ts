import { peopleSchema, personInputSchema, searchPeople } from '../../api';
import { ai } from '../config';

export const peopleTool = ai.defineTool({
    name: 'peopleTool',
    description: 'use this tool to try to search a Star Wars character',
    inputSchema: personInputSchema,
    outputSchema: peopleSchema,
  },
  async ({ name }) => searchPeople(name)
  );