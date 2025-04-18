import { filmCharactersFlow, storyFlow, posterFlow } from './ai';

(async () => {
  try {
    // const output = await filmCharactersFlow({ title: 'sith' });
    // console.log('output', output);

    const output2 = await storyFlow({ name: 'ana' });
    console.log('output2', output2);

    // const output2 = await posterFlow({ name: 'ana' });
    // console.log('output2', output2);
  } catch (e) {
    console.error(e);
  }
})();
