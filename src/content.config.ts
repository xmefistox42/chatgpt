import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const sharedFields = {
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  published: z.boolean().default(false),
  date: z.coerce.date(),
  tags: z.array(z.string().trim().min(1)).default([]),
  image: z.string().trim().min(1).optional(),
  imageAlt: z.string().trim().min(1).optional(),
};

const imageHasDescription = (entry: { image?: string; imageAlt?: string }) =>
  Boolean(entry.image) === Boolean(entry.imageAlt);

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z
    .object({
      ...sharedFields,
      status: z.enum(['planowany', 'w-trakcie', 'zakonczony']),
    })
    .refine(imageHasDescription, {
      message: 'Pola image i imageAlt muszą być uzupełnione razem.',
      path: ['imageAlt'],
    }),
});

const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news' }),
  schema: z.object(sharedFields).refine(imageHasDescription, {
    message: 'Pola image i imageAlt muszą być uzupełnione razem.',
    path: ['imageAlt'],
  }),
});

export const collections = { projects, news };
