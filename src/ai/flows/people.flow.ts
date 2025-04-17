import { z } from 'genkit';
import { peopleSchema, Person, personInputSchema } from '../../api';
import { ai } from '../config';
import { promptConfig } from '../constants/safety-settings.constant';
import { peopleTool } from '../tools/people.tool';
import { gemini20Flash } from '@genkit-ai/googleai';

async function searchPeople(name: string): Promise<Person[]> {
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
    config: promptConfig,
    model: gemini20Flash,
  });

  if (output == null) {
    throw new Error("Response doesn't satisfy schema.");
  }

  return output;
}

export const peopleFlow = ai.defineFlow(
  {
    name: 'peopleFlow',
    inputSchema: personInputSchema,
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async ({ name }, { sendChunk }) => {
    const output = await searchPeople(name);

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
      config: promptConfig,
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
