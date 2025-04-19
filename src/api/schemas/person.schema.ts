import { z } from 'genkit';

export const personInputSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
});

export const personSchema = z
  .object({
    name: z.string(),
    gender: z.string(),
    hair_color: z.string(),
    skin_color: z.string(),
    eye_color: z.string(),
  })
  .describe('The physical attributes of a Star Wars character.');

export const peopleSchema = z.array(personSchema);

export type Person = z.infer<typeof personSchema>;

export const personSearchResultsSchema = z.object({
  count: z.number(),
  previous: z.nullable(z.string()),
  next: z.nullable(z.string()),
  results: z.array(personSchema),
});
