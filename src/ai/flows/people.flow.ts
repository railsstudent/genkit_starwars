import { peopleSchema, personInputSchema } from '../../api';
import { ai } from '../config';
import { peoplePrompt } from '../prompts/people.prompt';

export const peopleFlow = ai.defineFlow(
    {
      name: 'peopleFlow',
      inputSchema: personInputSchema,
      outputSchema: peopleSchema,
    },
    async (input) => {
      const { output } = await peoplePrompt(input);
    
      if (output == null) {
        throw new Error("Response doesn't satisfy schema.");
      }
      return output;
    }
  );
