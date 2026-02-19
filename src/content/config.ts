import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    time: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const haiku = defineCollection({
  type: 'content',
  schema: z.object({
    stoneNumber: z.number(),
    poet: z.string(),
    image: z.string().optional(),
    location: z.string().optional(),
  }),
});

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    season: z.enum(['spring', 'summer', 'autumn', 'winter']),
    alt: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { events, haiku, gallery };
