import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Real media: an image (.png/.jpg/.webp) or a muted looping video (.mp4) under public/media/.
const media = z.object({
  src: z.string().startsWith('/media/'),
  alt: z.string(),
  poster: z.string().startsWith('/media/').optional(),
});

// One Markdown file per project per language: src/content/projects/<lang>/<slug>.md
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string(),
      fullTitle: z.string(),
      // Short name for tight spots such as the Explore sheet's project row
      short: z.string().optional(),
      order: z.number(),
      featured: z.boolean().default(true),
      kicker: z.string(),
      tagline: z.string(),
      period: z.string(),
      role: z.string().optional(),
      stack: z.array(z.string()),
      // Either an SVG diagram (`visual`) or real media (`cover` + chapter media) illustrates the project.
      visual: z.enum(['avsr', 'gesture', 'hinger', 'serms', 'gateflow']).optional(),
      cover: media.optional(),
      repo: z.url(),
      demo: z.url().optional(),
      metric: z.object({ value: z.string(), label: z.string() }),
      chapters: z
        .array(z.object({ kicker: z.string(), title: z.string(), body: z.string(), media: media.optional() }))
        .min(2),
    })
    .refine((d) => d.visual || d.cover, { message: 'A project needs a `visual` or a `cover`.' })
    .refine((d) => d.visual || d.chapters.every((c) => c.media), {
      message: 'Without a `visual`, every chapter needs `media`.',
    }),
});

export const collections = { projects };
