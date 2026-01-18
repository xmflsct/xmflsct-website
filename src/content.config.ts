import { defineCollection, z } from 'astro:content';

const cases = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    year: z.number(),
    priority: z.number(),
    title: z.string(),
    tags: z.union([z.string(), z.array(z.string())]).transform((val) => 
      typeof val === 'string' ? [val] : val
    ),
    description: z.string().nullish(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { cases, pages };
