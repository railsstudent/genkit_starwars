import { filmCharacterResultsSchema, filmInputSchema } from '../../api';
import { ai } from '../config';
import { filmCharactersPrompt } from '../prompts/file-characters.prompt';

export const filmCharactersFlow = ai.defineFlow(
    {
      name: 'filmCharactersFlow',
      inputSchema: filmInputSchema,
      outputSchema: filmCharacterResultsSchema,
    },
    async (input) => {
      const { output } = await filmCharactersPrompt(input);
    
      if (output == null) {
        throw new Error("Response doesn't satisfy schema.");
      }
      return output;
    }
);
