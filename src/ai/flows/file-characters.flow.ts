import { filmCharacterResultsSchema, filmInputSchema } from '../../api';
import { ai } from '../config';
import { GEMINI_20_FLASH } from '../constants/model.constant';
import { promptConfig } from '../constants/safety-settings.constant';
import { filmCharactersTool } from './../tools/file-characters.tool';

export const filmCharactersFlow = ai.defineFlow(
    {
      name: 'filmCharactersFlow',
      inputSchema: filmInputSchema,
      outputSchema: filmCharacterResultsSchema,
      streamSchema: filmCharacterResultsSchema,
    },
    async (input, { sendChunk }) => {
      const response = await ai.generateStream({
        system: `
You are a Star Wars expert who can list the characters in Star Wars films. 
You use the tool to perform a like search on film titles to find "${input.title}".
If there is no film found, return an empty array. 
If you do not know the answer, return an empty array and do not make up any characters or films.`,
        prompt: `Who are in the Star Wars films where the title includes ${input.title}?`,
        tools: [filmCharactersTool],
        output: {
            format: 'json',
            schema: filmCharacterResultsSchema,
        },
        config: promptConfig,
        model: GEMINI_20_FLASH,
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
