import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const configuredOrigin = process.env.PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`);

if (configuredOrigin && !/^https?:\/\/[^/]+\/?$/.test(configuredOrigin)) {
  throw new Error('PUBLIC_SITE_URL must be a full http(s) origin without a path.');
}

export default defineConfig({
  site: configuredOrigin || undefined,
  output: 'static',
  trailingSlash: 'always',
  integrations: configuredOrigin ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
});
