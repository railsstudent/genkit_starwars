import { filmCharactersFlow, peopleFlow } from './ai';
// import { peopleFlow, filmCharactersFlow } from './ai/flows';
// import { searchCharactersInFilm } from './api';

(async () => {
  const output = await filmCharactersFlow({ title: 'clone' });
  console.log('output', output);

  const output2 = await peopleFlow({ name: 'te' });
  console.log('output2', output2);
})();
