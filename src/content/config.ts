// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // v2.0+ usa 'content' para md/mdx
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // Transforma string "2025-11-23" em Date object
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default(['General']),
    // Opcional: imagem de capa para o card
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
