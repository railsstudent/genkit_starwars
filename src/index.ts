import { filmCharactersPrompt, peoplePrompt } from './ai';
// import { peopleFlow, filmCharactersFlow } from './ai/flows';
// import { searchCharactersInFilm } from './api';

(async () => {
  const { output } = await filmCharactersPrompt({ title: 'awa' });
  console.log('output', output);

  const { output: output2 } = await peoplePrompt({ name: 'bo' });
  console.log('output2', output2);
})();
