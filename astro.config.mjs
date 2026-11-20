// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages user site: the repo must be named cpg25ncu.github.io.
// If a custom domain is added later, change `site` to it.
export default defineConfig({
  site: 'https://cpg25ncu.github.io',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  // three.js is one lazy-loaded chunk (~130 KB gzipped), used only by the home hero.
  vite: { build: { chunkSizeWarningLimit: 600 } },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-CN' } },
    }),
  ],
});
