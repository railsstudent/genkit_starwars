import { filmCharactersFlow, peopleFlow } from './ai';

(async () => {
  const output = await filmCharactersFlow({ title: 'sith' });
  console.log('output', output);

  const output2 = await peopleFlow({ name: 'te' });
  console.log('output2', output2);
})();
