import { startFlowServer } from '@genkit-ai/express';
import { ContextProvider, RequestData } from 'genkit/context';
import { filmCharactersFlow, posterFlow, storyFlow } from './ai';

// CURL example with auth header
// curl --location 'http://localhost:5432/posterFlow' \
// --header 'x-name: Rebellion' \
// --header 'Content-Type: application/json' \
// --data '{
//     "data": {
//         "name": "luke skywalker"
//     }
// }'

const context: ContextProvider = (request: RequestData) => ({
  auth: {
    name: request.headers['x-name'] || '',
  },
});

startFlowServer({
  flows: [
    { flow: filmCharactersFlow, context },
    { flow: storyFlow, context },
    { flow: posterFlow, context },
  ],
  port: 5432,
  cors: {
    origin: '*',
  },
});
