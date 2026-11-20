import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per project per language: src/content/projects/<lang>/<slug>.md
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    fullTitle: z.string(),
    order: z.number(),
    kicker: z.string(),
    tagline: z.string(),
    period: z.string(),
    role: z.string().optional(),
    stack: z.array(z.string()),
    visual: z.enum(['avsr', 'gesture', 'hinger', 'serms']),
    repo: z.url(),
    metric: z.object({ value: z.string(), label: z.string() }),
    chapters: z
      .array(z.object({ kicker: z.string(), title: z.string(), body: z.string() }))
      .min(2),
  }),
});

export const collections = { projects };
