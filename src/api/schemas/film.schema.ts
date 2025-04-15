import { z } from 'genkit';

export const filmInputSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long'),
});

export const filmSchema = z.object({
  title: z.string(),
  characters: z.array(z.string()),
});

export type Film = z.infer<typeof filmSchema>;

export const filmSearchResultsSchema = z.object({
  count: z.number(),
  previous: z.nullable(z.string()),
  next: z.nullable(z.string()),
  results: z.array(filmSchema),
});

export const filmCharacterResultsSchema = z.array(filmSchema);
