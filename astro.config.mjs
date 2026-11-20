// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages user site (repo cpg25ncu.github.io) served on the custom domain tongyaoliu.com.
// The domain is set in the repo's Settings → Pages; DNS lives in Cloudflare (DNS only, not proxied).
export default defineConfig({
  site: 'https://tongyaoliu.com',
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
