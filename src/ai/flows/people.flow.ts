import { peopleSchema, personInputSchema } from '../../api';
import { ai } from '../config';
import { promptConfig } from '../constants/safety-settings.constant';
import { peopleTool } from '../tools/people.tool';

export const peopleFlow = ai.defineFlow(
    {
      name: 'peopleFlow',
      inputSchema: personInputSchema,
      outputSchema: peopleSchema,
      streamSchema: peopleSchema,
    },
    async (input, { sendChunk }) => {
      // const { output } = await peoplePrompt(input);
    
      // if (output == null) {
      //   throw new Error("Response doesn't satisfy schema.");
      // }
      // return output;
      const response = await ai.generateStream({
        system: `
You are a Star Wars expert who can search Star Wars people. 
You use the tool to perform a like search on names to find "${input.name}".
If there is no name found, return an empty array. 
If you do not know the answer, return an empty array and do not make up any characters.`,
        prompt: `Who has the name that includes ${input.name}?`,
        tools: [peopleTool],
        output: {
            format: 'json',
            schema: peopleSchema,
        },
        config: promptConfig,
        model: 'googleai/gemini-2.0-flash',
      })

      for await (const chunk of response.stream) {
        sendChunk((chunk as any).text);
      }
  
      const { output } = await response.response;
      if (output == null) {
        throw new Error("Response doesn't satisfy schema.");
      }
      return output;
    }
  );
