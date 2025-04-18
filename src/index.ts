import { startFlowServer } from '@genkit-ai/express';
import { filmCharactersFlow, posterFlow, storyFlow } from './ai';

startFlowServer({
  flows: [filmCharactersFlow, storyFlow, posterFlow],
  port: 5432,
  cors: {
    origin: '*',
  },
});
