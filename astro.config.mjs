import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bamberg-baufinanzierung.de',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/test'),
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: [],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
