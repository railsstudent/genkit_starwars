import { ActionContext } from 'genkit';

export interface NameContext extends ActionContext {
    auth: {
      name: string | undefined;
    };
}
  