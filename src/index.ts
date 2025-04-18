import { startFlowServer } from '@genkit-ai/express';
import { filmCharactersFlow, posterFlow, storyFlow } from './ai';

startFlowServer({
  flows: [filmCharactersFlow, storyFlow, posterFlow],
  port: 5432,
  cors: {
    origin: '*',
  },
});
  

// (async () => {
//   try {
//     // const output = await filmCharactersFlow({ title: 'sith' });
//     // console.log('output', output);

//     const output2 = await storyFlow({ name: 'ana' });
//     console.log('output2', output2);

//     // const output2 = await posterFlow({ name: 'ana' });
//     // console.log('output2', output2);
//   } catch (e) {
//     console.error(e);
//   }
// })();
