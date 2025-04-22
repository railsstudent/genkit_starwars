import { ContextProvider } from 'genkit/context';
import { NameContext } from './name.context';

export const context: ContextProvider<NameContext> = (request) => ({
    auth: {
      name: request.headers['x-name'] || '',
    },
});
