/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { peopleTool } from './ai';
// import { peopleFlow, filmCharactersFlow } from './ai/flows';
// import { searchCharactersInFilm } from './api';

(async () => {
  // const response = await peoplePrompt({ name: 'darth' })
  // console.log("response", response.output);

  const output = await peopleTool({ name: 'darth' })
  console.log("output", output);

  const output2 = await peopleTool({ name: 'r8' })
  console.log("output2", output2);

  // console.log(await searchCharactersInFilm('awa'));

  // const evilPeople = await filmCharactersFlow({ key: 'awa' })
  // console.log("response3", evilPeople);
})();
