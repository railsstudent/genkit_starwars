import { gemini20Flash } from '@genkit-ai/googleai';
import { peopleSchema, Person } from '../api';
import { ai } from './config';
import { responseConfig } from './constants/safety-settings.constant';
import { peopleTool } from './tools/people.tool';

export async function searchPeopleByTool(name: string): Promise<Person[]> {
    const { output } = await ai.generate({
      system: `
    You are a Star Wars expert who can search Star Wars people. 
    You use the tool to perform a like search on names to find "${name}".
    If there is no name found, return an empty array. 
    If you do not know the answer, return an empty array and do not make up any characters.
      `,
      prompt: `Who has the name that includes ${name}?`,
      tools: [peopleTool],
      output: {
        format: 'json',
        schema: peopleSchema,
      },
      config: responseConfig,
      model: gemini20Flash,
    });
  
    if (output == null) {
      throw new Error("Response doesn't satisfy schema.");
    }
  
    return output;
  }