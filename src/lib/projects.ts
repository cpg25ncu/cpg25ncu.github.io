import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Project = CollectionEntry<'projects'> & { slug: string };

/** Projects for one language, in display order. Entry ids look like "en/avsr". */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const all = await getCollection('projects', (entry) => entry.id.startsWith(`${lang}/`));
  return all
    .map((entry) => ({ ...entry, slug: entry.id.slice(lang.length + 1) }))
    .sort((a, b) => a.data.order - b.data.order);
}
