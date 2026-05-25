import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bamberg-baufinanzierung.de',
  output: 'static',
  adapter: vercel({
    // Analytics standardmaessig aus — wird via Cookie-Banner-Consent
    // bei Bedarf manuell aktiviert. Bis dahin: keine externen Tracking-Requests.
    webAnalytics: { enabled: false },
    imageService: true,
  }),
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/test'),
      // Build-Datum als lastmod-Defaultwert für alle Seiten
      // (Astro hat keine Git-Integration für File-mtime out of the box).
      serialize(item) {
        const url = item.url;
        const isHome = url === 'https://bamberg-baufinanzierung.de/';
        const isLegal =
          url.includes('/impressum') || url.includes('/datenschutz');

        // Per-Page Priority + Changefreq
        if (isHome) {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (isLegal) {
          item.changefreq = 'yearly';
          item.priority = 0.3;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }

        // lastmod: Build-Datum (ISO ohne Zeit) — wird bei jedem Deploy aktualisiert
        item.lastmod = new Date().toISOString().split('T')[0];

        return item;
      },
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
