import { filmCharactersTool, peopleTool } from './ai';
// import { peopleFlow, filmCharactersFlow } from './ai/flows';
// import { searchCharactersInFilm } from './api';

(async () => {
  // const response = await peoplePrompt({ name: 'darth' })
  // console.log("response", response.output);

  const output = await peopleTool({ name: 'darth' })
  console.log("output", output);

  const output2 = await peopleTool({ name: 'pal' })
  console.log("output2", output2);

  const output3 = await filmCharactersTool({ key: 'awa' })
  console.log("output3", output3);

  const output4 = await filmCharactersTool({ key: 'war' })
  console.log("output4", output4);
})();
