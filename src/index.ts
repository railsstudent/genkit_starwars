import { filmCharactersFlow, storyFlow } from './ai';

(async () => {
  // const output = await filmCharactersFlow({ title: 'sith' });
  // console.log('output', output);

  const output2 = await storyFlow({ name: 'ana' });
  console.log('output2', output2);
})();
