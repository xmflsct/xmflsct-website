import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cases = defineCollection({
  loader: glob({
    pattern: '**/index.mdx',
    base: './src/content/cases',
    generateId: ({ entry }) => entry.replace(/\/index\.mdx$/, ''),
  }),
  schema: z.object({
    year: z.number(),
    priority: z.number(),
    title: z.string(),
    tags: z.union([z.string(), z.array(z.string())]).transform((val) => 
      typeof val === 'string' ? [val] : val
    ),
    description: z.string().nullish(),
  }),
});

export const collections = { cases };
