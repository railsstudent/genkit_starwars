import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

import 'dotenv/config';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: gemini20Flash,
});
