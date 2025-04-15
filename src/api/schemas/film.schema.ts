import { z } from 'zod';

export const filmInputSchema = z.object({
  key: z.string()
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
