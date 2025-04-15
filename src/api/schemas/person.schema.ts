import { z } from 'zod';

export const personInputSchema = z.object({
  name: z.string().min(2)
});

export const personSchema = z.object({
  name: z.string(),
  gender: z.string(),
  hair_color: z.string(),
  height: z
    .string()
    .transform((value) => { 
      if (!value) {
        return 160;
      }
      const parsed = parseInt(value);
      return isNaN(parsed) ? 160 : parsed;
    }),
  mass: z
    .string()
    .transform((value) => { 
      if (!value) {
        return 65;
      }
      const parsed = parseInt(value);
      return isNaN(parsed) ? 65 : parsed;
    }),
  skin_color: z.string(),
  eye_color: z.string(),
}).describe('The physical attributes of a Star Wars character.');

export const peopleSchema = z.array(
  z.object({
    name: z.string(),
    gender: z.string(),
    hair_color: z.string(),
    height: z.number(),
    mass: z.number(),
    skin_color: z.string(),
    eye_color: z.string(),
  }
));

export type Person = z.infer<typeof personSchema>;

export const personSearchResultsSchema = z.object({
  count: z.number(),
  previous: z.nullable(z.string()),
  next: z.nullable(z.string()),
  results: z.array(personSchema),
});
