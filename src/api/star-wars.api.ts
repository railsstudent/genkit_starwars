import { Person, personSchema, personSearchResultsSchema } from './schemas/person.schema';

const BASE_URL = 'https://swapi.py4e.com/api';

export async function searchPeople(name: string): Promise<Person[]> {
    console.log('execute searchPeople', name);
    const response = await fetch(`${BASE_URL}/people?search=${name}`);
    const data = await response.json();

    const { results } = personSearchResultsSchema.parse(data);

    console.log('results', results);

    if (!results) {
        return [];
    }
    return results;
}

async function searchCharacterByUrl(url: string): Promise<Person | undefined> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const person = personSchema.parse(data);

        return person;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

// export async function searchCharactersInFilm(title: string): Promise<Film[]> {
//     console.log(searchCharactersInFilm, title);

//     const response = await fetch(`${BASE_URL}/films?search=${title}`);
//     const data = await response.json();
//     const { results: filmResults } = filmSearchResultsSchema.parse(data);

//     if (filmResults.length === 0) {
//         return [];
//     }

//     // find the characters of each film
//     const characterUrls = filmResults.map((film) => film.characters);
    
//     // array of array of promises
//     const characterPromises: Promise<Person | undefined>[][] = [];
//     for (let i = 0; i < characterUrls.length; i++) {
//         const filmCharacterUrls = characterUrls[i];
//         const filmCharacterPromises = 
//             filmCharacterUrls.map((url) => searchCharacterByUrl(url));
        
//         characterPromises.push(filmCharacterPromises);
//     }

//     const nestedPromiseAll = [];    
//     for (let i = 0; i < characterPromises.length; i++) {
//         nestedPromiseAll.push(Promise.allSettled(characterPromises[i]));
//     }

//     const results = [];
//     const characterInfos = await Promise.allSettled(nestedPromiseAll);
//     for (let i = 0;  i < characterInfos.length; i++) {
//         const characterInfo = characterInfos[i];
//         if (characterInfo.status === 'rejected') {
//             results.push({
//                 title: filmResults[i].title,
//                 characters: [],
//             });
//         } else {
//             const characters = [];
//             for (const character of characterInfo.value) {
//                 if (character.status === 'fulfilled') {
//                     characters.push(character.value?.name || 'NA');
//                 }
//             }
//             results.push({
//                 title: filmResults[i].title,
//                 characters,
//             });
//         }
//     }

//     console.log("results", results);
//     return results;
// }