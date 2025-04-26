import { UserFacingError, z } from 'genkit';
import { personInputSchema } from '../../api';
import { ai } from '../config';
import { generatePoster, searchPeopleByTool } from '../utils';

export const posterFlow = ai.defineFlow(
  {
    name: 'posterFlow',
    inputSchema: personInputSchema,
    outputSchema: z.object({
      name: z.string(),
      filenames: z.array(z.string()),
    }),
  },
  async ({ name }, { context }) => {
    if (!context?.auth) {
      throw new UserFacingError('UNAUTHENTICATED', 'Unathenticated.');
    }

    if (context?.auth?.name !== 'Rebellion') {
      throw new UserFacingError('PERMISSION_DENIED', 'Permission denied.');
    }

    const output = await searchPeopleByTool(name);

    if (output.length === 0) {
      throw new UserFacingError('NOT_FOUND', 'No people found.');
    }

    if (output.length === 1) {
      return generatePoster(output[0], 1);
    }

    // more than one selection. randomly select one
    const idx = Math.floor(Math.random() * output.length);
    return generatePoster(output[idx], 1);
  },
);
