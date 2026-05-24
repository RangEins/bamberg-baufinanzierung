# Tasks – Baufinanzierung Bamberg (Phase 1, Astro-Stack)

> Reihenfolge ist verbindlich. Tasks innerhalb einer Phase können parallel laufen, Phasen selbst sind sequenziell.

---

## Phase 0 – Repo & Setup (≈ 1 h)

### Task 0.1 – Repo anlegen
- [ ] GitHub-Repo `RangEins/baufi-bamberg` erstellen, privat
- [ ] `mirrors.md` aus Herzogenaurach-Repo kopieren, um Bamberg ergänzen + Stack-Vermerk (siehe Anhang A)
- [ ] `concept.md` + `claude.md` ins Repo-Root pushen

### Task 0.2 – Astro 6 initialisieren
```bash
npm create astro@latest baufi-bamberg -- --template minimal --typescript strict --no-install --no-git
cd baufi-bamberg
npm install
```

- [ ] Astro-Version in `package.json` prüfen: muss `^6.3` sein
- [ ] `tsconfig.json` mit `extends: "astro/tsconfigs/strict"`

### Task 0.3 – Integrationen hinzufügen
```bash
npx astro add tailwind react sitemap netlify
```

Das modifiziert automatisch `astro.config.mjs` und installiert die Peer-Dependencies. Falls Warnings: `npm install` nachschieben.

Anschließend manuell:
```bash
npm install lucide-astro gsap framer-motion three
npm install -D @types/three
```

### Task 0.4 – `astro.config.mjs` finalisieren

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://bamberg-baufinanzierung.de',
  output: 'static',
  adapter: netlify(),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/test'),
    }),
  ],
  image: {
    domains: [], // keine externen Image-Quellen
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
```

### Task 0.5 – Fonts einbinden
- [ ] In `src/layouts/BaseLayout.astro` `<link rel="preconnect" href="https://fonts.googleapis.com">` und `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` einfügen
- [ ] `<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Inter:wght@300..800&display=swap" rel="stylesheet">`
- [ ] Alternativ: experimentelle Astro Font API ausprobieren (lokales Selfhosting, kein Google-Call zur Ladezeit)

### Task 0.6 – Tailwind-Theme erweitern
- [ ] Farben aus `claude.md` §4 in `tailwind.config.mjs` eintragen
- [ ] `src/styles/global.css`: `@tailwind base; @tailwind components; @tailwind utilities;` + CSS-Variablen für Schatten/Border-Radius
- [ ] In `BaseLayout.astro`: `import '@/styles/global.css';`

### Task 0.7 – Path-Alias
- [ ] `tsconfig.json` → `"paths": { "@/*": ["./src/*"] }`
- [ ] In `astro.config.mjs` ggf. `vite: { resolve: { alias: { '@': '/src' } } }`

### Task 0.8 – Deployment vorbereiten
- [ ] Netlify-Projekt anlegen, Repo verknüpfen, Build-Command `npm run build`, Publish-Directory `dist/`
- [ ] `netlify.toml` mit Headers (Security, Caching) anlegen
- [ ] Domain `bamberg-baufinanzierung.de` im DNS aufbauen, Custom Domain in Netlify hinterlegen

---

## Phase 1 – Datengrundlage (≈ 1 h)

### Task 1.1 – `src/lib/content.ts`
Zentraler Content-Store, damit Komponenten textfrei bleiben.

Mindestens enthalten:
- `HERO_HEADLINE`, `HERO_SUBTITLE`, `HERO_CTA`
- `STATS_ITEMS` (4 Items: 600+, 25 Jahre, 98 %, 24 h)
- `COMPARISON_ROWS` (Hausbank vs. Frankenbaufi, 6–8 Zeilen)
- `SERVICES` (4 Items)
- `FOERDERUNG_ITEMS` (KfW, BAFA, BayernLabo) + `DENKMALSCHUTZ_NOTE`
- `MARKET_DATA_STADT` (Tabelle Stadt Bamberg)
- `MARKET_DATA_LANDKREIS` (5 Gemeinden, siehe concept.md 3.2)
- `REGION_CARDS` (9 Karten nach claude.md 7.5)
- `FAQ_ITEMS` (10 Items, siehe Anhang B)
- `FOOTER_LINKS`, `SISTER_SITES`

### Task 1.2 – `src/lib/seo.ts`
Schema-Markup-Generatoren als reine Funktionen, die JSON zurückgeben:
- `localBusinessSchema()` – `FinancialService` mit `areaServed: ["Bamberg", "Landkreis Bamberg", "Oberfranken"]`
- `serviceSchema()` – `Baufinanzierungsvermittlung`
- `faqSchema()` – `FAQPage` aus `FAQ_ITEMS`

Einbindung in `BaseLayout.astro`:
```astro
<script type="application/ld+json" set:html={JSON.stringify(localBusinessSchema())} />
```

### Task 1.3 – Asset-Sammlung
- [ ] Hero-Bild: Welterbe-Altstadt **oder** Lagarde-Campus (Stockfoto-Lizenz prüfen oder eigene Aufnahme)
- [ ] OG-Image 1200×630 mit Headline + Frankenbaufi-Logo + Bamberg-Skyline
- [ ] Favicon-Set (16/32/180/512)
- [ ] Alle Bilder als JPG (Quelle) **in `src/assets/`** ablegen – Astro generiert AVIF + WebP automatisch über `astro:assets`

---

## Phase 2 – Komponenten (≈ 5–6 h)

### Task 2.1 – `BaseLayout.astro`
Globales Layout mit Header, Footer, SEO-Meta, JSON-LD.

```astro
---
import '@/styles/global.css';
import Header from '@/components/Header.astro';
import Footer from '@/components/Footer.astro';
import { localBusinessSchema, serviceSchema, faqSchema } from '@/lib/seo';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const { title, description, canonical, ogImage = '/og-image.png' } = Astro.props;
const canonicalURL = canonical || new URL(Astro.url.pathname, Astro.site).toString();
---

<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:type" content="website" />
    <meta name="robots" content="index, follow" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Inter:wght@300..800&display=swap" rel="stylesheet" />
    <script type="application/ld+json" set:html={JSON.stringify(localBusinessSchema())} />
    <script type="application/ld+json" set:html={JSON.stringify(serviceSchema())} />
    <script type="application/ld+json" set:html={JSON.stringify(faqSchema())} />
  </head>
  <body class="bg-cream-50 text-ink font-body">
    <Header />
    <main><slot /></main>
    <Footer />
  </body>
</html>
```

### Task 2.2 – `Header.astro`
- Sticky-Header, transparent über Hero, weiß ab Scroll > 80 px (CSS-only mit `position: sticky` + Intersection Observer in einem kleinen `<script>` mit `client:idle`)
- Logo links („Frankenbaufi · Bamberg")
- Rechts: Telefonnummer + CTA-Button „Beratung anfragen" → Anker `#anfragen`

### Task 2.3 – `Hero.astro`
- 2-Spalten-Layout: links Headline + Subtitle + Trust-Badges + Phone-CTA, rechts `<LeadWizard client:visible />`
- Hero-Bild mit `<Image priority />` (sofortiges Laden, beste LCP)
- Hintergrund: Welterbe-Bild mit Navy-950-Overlay 60 %, Gold-Radial-Gradient oben rechts
- GSAP-Reveal: Headline → Subtitle → Badges (staggered) – über `<script>`-Tag am Ende der Komponente

### Task 2.4 – `wizard/LeadWizard.tsx` (React-Island)
4-Schritte-Wizard:
1. Vorhaben (Hauskauf / Anschluss / Modernisierung / Neubau)
2. Finanzierungssumme (Slider: 100k – 1.5M)
3. Eigenkapital (Slider: 0 – 500k)
4. Kontaktdaten (Name, Mail, Telefon, optional Ort)

- Progress-Bar oben (4 Segmente)
- Step-Transitions mit Framer Motion (slide-fade)
- Submit → **Netlify Form** mit `data-netlify="true"`-Attribut (Phase 1, kein Backend nötig) ODER Astro Action (Phase 2)
- Success-Screen: „Vielen Dank, Christoph meldet sich innerhalb von 24 h."
- Validierung: E-Mail muss valide sein, Telefon optional aber empfohlen

**Netlify-Form-Snippet** (innerhalb des React-Components als hidden form für Netlify-Detection):
```tsx
{/* Static hidden form for Netlify Forms detection */}
<form name="lead" data-netlify="true" hidden>
  <input name="name" />
  <input name="email" />
  <input name="phone" />
  <textarea name="message" />
</form>
```

Im echten Submit dann `fetch('/', { method: 'POST', body: new URLSearchParams({...}), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })`.

### Task 2.5 – `StatsBar.astro`
- Horizontaler Streifen, `bg-navy-950`
- 4 Stats, Zahlen mit `font-display`, Labels mit `font-body`
- Subtle Hover: Goldener Underline-Effekt (CSS-only)

### Task 2.6 – `ComparisonTable.astro`
- 2-Spalten-Tabelle: Hausbank vs. Frankenbaufi
- 6–8 Zeilen, jeweils mit Check/X-Icon aus `lucide-astro`
- Mobile: Cards untereinander (Tailwind `md:table` mit Fallback)

### Task 2.7 – `Services.astro`
- 4 Karten (Immobilienfinanzierung / Anschluss / Modernisierung / Förderung)
- Lucide-Astro-Icons groß oben, Headline, 2–3 Zeilen Text
- Hover: subtle Lift + Gold-Underline (CSS-only, kein JS)
- Click → Scroll zu jeweiliger Detail-Sektion oder zum Wizard

### Task 2.8 – `Foerderung.astro`
- Eingangstext: „Förderungen senken Ihre monatliche Rate – wenn die Reihenfolge stimmt."
- 3 Spalten: KfW / BAFA / BayernLabo, je mit 2–3 konkreten Förderprodukten
- **Hinweis-Box (Gold-Akzent):** „Wichtig: Reihenfolge beachten – Förderzusage **vor** Notartermin."
- **Denkmalschutz-Block (Cream-200 Hintergrund):** Erklärung KfW 297/298 + §7i EStG (siehe claude.md 7.3)
- Beispielrechnung: Sanierung einer Altbauwohnung in der Inselstadt mit Denkmal-AfA

### Task 2.9 – `MarketData.astro`
- 2 Tabellen nebeneinander (Desktop) bzw. untereinander (Mobile):
  - Tabelle 1: Stadt Bamberg (3 Spalten: Segment / Ø-Preis / Spanne)
  - Tabelle 2: Landkreis Bamberg (Hallstadt, Hirschaid, Memmelsdorf, Strullendorf, Burgebrach)
- Fußnote mit Quellen (Immowelt, Engel & Völkers, Stand Mai 2026)

### Task 2.10 – `MidPageCTA.astro` + `three/particle-field.ts`
- Vollbreite-Sektion, `bg-navy-950` + Gold-Gradient-Overlay
- Großer Claim + Primary-CTA → Scroll zum Wizard
- Three.js-Particle-Layer: separate Datei `src/components/three/particle-field.ts` (Vanilla TS, kein React)
- In `MidPageCTA.astro` einbinden:
  ```astro
  <canvas id="particle-canvas" class="absolute inset-0 -z-10 hidden md:block"></canvas>
  <script>
    import('./three/particle-field').then(({ initParticles }) => {
      initParticles(document.getElementById('particle-canvas'));
    });
  </script>
  ```
- Dynamic import + `hidden md:block` → kein Mobile-Load, kein blockierender JS-Cost

### Task 2.11 – `RegionGrid.astro`
- 3×3 Grid auf Desktop, 1-spaltig auf Mobile
- Jede Karte: Headline (z. B. „Baufinanzierung Hirschaid"), Badge (Charakter), 2–3 Stats, 2–3 Sätze Text, CTA „Anfrage Hirschaid →"
- Karten alternieren Cream-50/Cream-100
- Hover: Lift + Gold-Glow (CSS-only)
- 9. Card = Fallback „Andere Landkreis-Gemeinde?"

### Task 2.12 – `FAQ.astro` (nativer Accordion, Zero-JS)
- Iteration über `FAQ_ITEMS` mit `<details>` + `<summary>`
- Custom Styling für `summary::marker` (entfernen) + Rotation des Chevron-Icons mit `details[open]`-Selektor
- `set:html` für Antwort-Content (erlaubt Inline-Links)
- JSON-LD `FAQPage` ist bereits in `BaseLayout.astro` eingebunden

### Task 2.13 – `Footer.astro`
- 4 Spalten: Brand+NAP, Leistungen, Regionen, Informationen
- Cross-Link-Sektion „Auch in Ihrer Region beraten" mit Links zu Forchheim, Erlangen, Herzogenaurach
- Bottom-Row: Copyright + Impressum + Datenschutz
- `bg-navy-950` mit `BlurOrb` Gold oben rechts

---

## Phase 3 – SEO & Pflicht-Dateien (≈ 30 min)

### Task 3.1 – Sitemap (automatisch)
Sitemap wird durch `@astrojs/sitemap` automatisch beim Build generiert (`dist/sitemap-index.xml` und `dist/sitemap-0.xml`). Keine manuelle Datei nötig.

### Task 3.2 – `public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://bamberg-baufinanzierung.de/sitemap-index.xml
```

### Task 3.3 – `public/llms.txt`
Siehe Anhang C.

### Task 3.4 – `src/pages/index.astro` Meta
- `<BaseLayout title="..." description="..." />` mit allen Meta-Daten

### Task 3.5 – Dynamisches OG-Image (optional, Phase 2)
Astro hat kein `ImageResponse`-Äquivalent wie Next.js. Für Phase 1: statisches PNG in `public/og-image.png`. Falls dynamisch nötig: über `@vercel/og` als externen Edge-Function-Aufruf möglich.

---

## Phase 4 – Pflicht-Subpages (≈ 1 h)

### Task 4.1 – `src/pages/impressum.astro`
- Inhalt 1:1 von frankenbaufi.de übernehmen, Domain anpassen
- Eingebunden via `<BaseLayout title="Impressum">` (robots: index, follow per Default)

### Task 4.2 – `src/pages/datenschutz.astro`
- Inhalt 1:1 von frankenbaufi.de übernehmen, Domain anpassen
- Sektion zu Lead-Wizard-Datenverarbeitung ergänzen (E-Mail an angebot@frankenbaufi.de via Netlify Forms, Speicherdauer)
- Falls Google Analytics über Partytown: Cookie-Banner-Logik dokumentieren

---

## Phase 5 – QA & Go-Live (≈ 1 h)

### Task 5.1 – Lighthouse-Audit
- [ ] Performance Mobile ≥ 95
- [ ] SEO ≥ 95
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95

### Task 5.2 – Astro-Build-Audit
- [ ] `npm run build` → keine Warnings
- [ ] `dist/_astro/`-Folder inspizieren: kein einzelnes JS-Bundle >50 KB außer Wizard
- [ ] `dist/index.html` öffnen und prüfen: Hero, Stats, Comparison, Services, Foerderung, MarketData sind reines HTML (kein hydration markup)

### Task 5.3 – Cross-Browser
- [ ] Chrome / Safari / Firefox / Edge auf Desktop
- [ ] Safari iOS + Chrome Android
- [ ] Tab-Reihenfolge im LeadWizard testen
- [ ] `<details>`-Accordion auf allen Browsern prüfen (Safari iOS hat manchmal Eigenheiten)

### Task 5.4 – Lead-Test
- [ ] Echte Testanfrage durchschicken
- [ ] Netlify Forms Dashboard prüfen → Submission erscheint
- [ ] E-Mail-Forwarding zu angebot@frankenbaufi.de in Netlify aktivieren
- [ ] Validierungen testen (leere Felder, ungültige Mail)

### Task 5.5 – SEO-Indexierung
- [ ] Google Search Console verifizieren (DNS-TXT)
- [ ] Sitemap einreichen (`https://bamberg-baufinanzierung.de/sitemap-index.xml`)
- [ ] frankenbaufi.de → bamberg-baufinanzierung.de als Backlink setzen

### Task 5.6 – Abnahme
Christoph + Niklas gehen die Seite gemeinsam durch und checken die Abnahme-Kriterien aus `concept.md` §8 ab.

---

# Anhang A – `mirrors.md`

```markdown
# Mirrors – Schwester-Sites von Frankenbaufi

Vier Standort-Sites teilen sich Marke und Beraterprofil:

| Region | URL | Repo | Stack |
|---|---|---|---|
| Forchheim | https://baufinanzierung-forchheim.de | RangEins/baufi-forchheim | Next.js 14 |
| Erlangen | https://baufinanzierung-erlangen.de | RangEins/baufi-erlangen | Next.js 14 |
| Herzogenaurach | https://baufinanzierung-herzogenaurach.de | RangEins/baufi-herzogenaurach | Next.js 14 |
| Bamberg | https://bamberg-baufinanzierung.de | RangEins/baufi-bamberg | **Astro 6.3** |

## Stack-Hinweis
Bamberg läuft als einzige Site auf Astro statt Next.js. Visuelle Sprache und Tonalität sind identisch, der Code-Stack unterscheidet sich. Bei Komponenten-Übernahmen zwischen Sites entsprechend übersetzen.

## Crosslink-Logik
Im Footer jeder Standort-Seite verweist eine Sektion „Auch in Ihrer Region beraten" auf die drei Schwester-Sites. Damit gewinnen alle vier Domains topical authority, ohne in Duplicate-Content-Fallen zu laufen.

## Geteilte Marke
- NAP: Frankenbaufi · angebot@frankenbaufi.de · 09131 6238530
- Mutterseite: frankenbaufi.de
- Berater: Christoph
- Design-Sprache: Navy + Gold, Fraunces + Inter
```

---

# Anhang B – FAQ_ITEMS (10 Items)

1. **Was kostet die Beratung?**
   Vollständig kostenlos. Wir erhalten unsere Provision von der Bank, die den Kredit vergibt – nicht vom Käufer.

2. **Warum nicht direkt zur Hausbank?**
   Die Hausbank verkauft nur eigene Produkte. Wir vergleichen über 600 Banken und finden dadurch in den allermeisten Fällen günstigere Konditionen.

3. **Wie schnell bekomme ich eine Rückmeldung?**
   Innerhalb von 24 Stunden meldet sich Christoph persönlich – per Telefon oder E-Mail, ganz wie Sie es wünschen.

4. **Beraten Sie auch im Landkreis Bamberg?**
   Ja. Hirschaid, Hallstadt, Memmelsdorf, Strullendorf, Burgebrach, Scheßlitz, Litzendorf, Bischberg – wir sind in allen Gemeinden des Landkreises Bamberg tätig.

5. **Was unterscheidet die Bamberger Welterbe-Altstadt von anderen Lagen?**
   Objekte in der Welterbezone sind oft denkmalgeschützt. Das öffnet KfW 297/298 sowie steuerliche AfA-Sonderabschreibungen nach §7i EStG – aber nur in der richtigen Reihenfolge. Wir kennen die Stolperfallen.

6. **Ich arbeite bei Brose, Bosch oder Schaeffler – worauf muss ich achten?**
   Industriearbeitnehmer in der Region haben typischerweise eine sehr gute Bonität bei Banken: lange Betriebszugehörigkeit, planbare Schichtzulagen, oft betriebliche Altersvorsorge. Das müssen Sie in der Antragstellung richtig aufzeigen – sonst bewertet die Bank Ihr Einkommen unter Ihrem tatsächlichen Wert.

7. **Was ist Forward-Darlehen und ab wann lohnt es sich?**
   Ein Forward-Darlehen sichert die heutigen Zinsen für eine Anschlussfinanzierung, die erst in 1–5 Jahren startet. Lohnt sich besonders bei steigenden Zinsen – wir rechnen Ihre Situation konkret durch.

8. **Wie lange dauert eine komplette Finanzierung von der Anfrage bis zur Auszahlung?**
   Bei sauberen Unterlagen üblicherweise 4–6 Wochen. Erstgespräch und Konditionsvergleich sind innerhalb einer Woche möglich.

9. **Was ist mit Lagarde-Campus und anderen Konversionsflächen?**
   Lagarde, Pines, Offizierssiedlung – das sind oft Neubauten mit KfW-40-Standard oder besser, also mit attraktiven Förderkonditionen. Bei Bauträger-Modellen gibt es Spezifika (Kaufpreisraten, Bürgschaft), die wir gemeinsam durchgehen.

10. **Wie ist Frankenbaufi entstanden?**
    Frankenbaufi ist die Marke des unabhängigen Baufinanzierungsberaters Christoph mit 25 Jahren Erfahrung in der Region. Standort-Sites in Forchheim, Erlangen, Herzogenaurach und Bamberg sorgen dafür, dass jede Region ihren eigenen Ansprechpartner hat.

---

# Anhang C – `public/llms.txt`

```markdown
# Baufinanzierung Bamberg – Frankenbaufi

> Unabhängiger Baufinanzierungsberater für Bamberg und den Landkreis Bamberg. Über 600 Banken im Vergleich, kostenlos für den Kunden, 25 Jahre Marktkenntnis in Franken.

## Über
- **Anbieter:** Frankenbaufi (Christoph)
- **Standort:** Bamberg + Landkreis Bamberg
- **Kontakt:** angebot@frankenbaufi.de · 09131 6238530
- **Mutterseite:** frankenbaufi.de
- **Schwestern:** baufinanzierung-forchheim.de, baufinanzierung-erlangen.de, baufinanzierung-herzogenaurach.de
- **Tech-Stack:** Astro 6.3 (statisch, Netlify-deployed)

## Leistungen
- Immobilienfinanzierung (Hauskauf, Wohnungskauf, Neubau)
- Anschlussfinanzierung & Forward-Darlehen
- Modernisierungskredite
- KfW-/BAFA-/BayernLabo-Förderprüfung
- Denkmalschutz-Finanzierung (KfW 297/298, §7i EStG AfA)

## Marktdaten Bamberg (Stand Mai 2026)
- Ø Hauspreis Stadt: ~4.150 €/m² (Spanne 2.970 – 5.280 €/m²)
- Ø Wohnungspreis Stadt: ~3.600 €/m²
- Teuerster Stadtteil: Wildensorg
- Günstigster Stadtteil: Hirschknock
- Großarbeitgeber Stadt: Bosch, Wieland Electric, Uni Bamberg, Erzbistum, Sparkasse
- Großarbeitgeber Landkreis: Brose (Hallstadt), Schaeffler (Hirschaid), Thomann (Burgebrach)
- Neubau-Hotspot: Lagarde-Campus (~19,4 ha Konversionsfläche)

## Einzugsgebiet
Stadt Bamberg (Inselstadt, Bergstadt, Wildensorg, Gartenstadt, Gaustadt, Bug, Wunderburg) sowie die Landkreis-Gemeinden Hirschaid, Hallstadt, Memmelsdorf, Strullendorf, Burgebrach, Scheßlitz, Litzendorf, Bischberg, Oberhaid, Stegaurach, Pommersfelden, Buttenheim, Frensdorf, Heiligenstadt i. OFr., Zapfendorf, Rattelsdorf, Baunach, Schlüsselfeld, Breitengüßbach, Kemmern, Gundelsheim.

## Wichtige Sektionen
- /#anfragen – Lead-Wizard (4 Schritte)
- /#baufinanzierung – Immobilienfinanzierung Detail
- /#anschlussfinanzierung – Anschluss & Forward-Darlehen
- /#foerderung – KfW & BAFA Förderung inkl. Denkmalschutz
- /#region – Standort-Übersicht Landkreis
- /#faq – Häufige Fragen
```
