import { gemini25ProExp0325, googleAI } from '@genkit-ai/googleai';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import { genkit } from 'genkit';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: gemini25ProExp0325,
});

export const geminiAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});
