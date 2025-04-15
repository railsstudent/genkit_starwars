import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

export const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});
