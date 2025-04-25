import { startFlowServer, withContextProvider } from '@genkit-ai/express';
import { context, fictionFlow, filmCharactersFlow, posterFlow } from './ai';

// CURL example with auth header
// curl --location 'http://localhost:5432/posterFlow' \
// --header 'x-name: Rebellion' \
// --header 'Content-Type: application/json' \
// --data '{
//     "data": {
//         "name": "luke skywalker"
//     }
// }'

startFlowServer({
  flows: [
    withContextProvider(filmCharactersFlow, context),
    withContextProvider(fictionFlow, context),
    withContextProvider(posterFlow, context),
  ],
  port: parseInt(process.env.PORT || '3333'),
  cors: {
    origin: '*',
  },
});
