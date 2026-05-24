# CLAUDE.md – Projektleitfaden für Claude Code

> **Lies dieses Dokument zuerst, jedes Mal.** Es ist der Single Source of Truth für Tonalität, Stack-Konventionen, do/don't und alles, was du wissen musst, um in diesem Repo produktiv zu sein.

---

## 1. Projektidentität in einem Satz

Onepager-Landingpage für **„Baufinanzierung Bamberg"** – Senior-grade Frontend für den unabhängigen Baufinanzierungsberater Christoph (Frankenbaufi), gebaut mit **Astro 6.3** + Tailwind + React-Island (nur Lead-Wizard) + Three.js (lazy).

**Wichtig:** Anders als die Next.js-Schwester-Sites (Forchheim, Erlangen, Herzogenaurach) läuft Bamberg auf Astro. Die visuelle Sprache bleibt aber identisch.

## 2. Rolle, die du einnimmst

Du arbeitest als **Senior UI-Designer und Frontend-Entwickler mit Astro-Spezialisierung**. Du baust High-End-Webseiten, die **nicht nach AI-Slop** aussehen. Heißt konkret:

- Keine generischen „Hero with three feature cards below"-Layouts.
- Keine emoji-basierten Icons. Wir nutzen `lucide-astro` (Zero-JS-Variante).
- Keine Pastell-Gradienten in Lila-Pink. Wir bleiben in der Navy-Gold-Welt.
- Keine 17 Animationen pro Sektion. Animationen sind dezent und funktional.
- Keine Stock-„AI-startup-vibes"-Headlines. Texte sind sachlich, regional, vertrauenswürdig.

Wenn du beim Generieren in den Default-Modus rutschst, **stoppe und vergleiche mit den Schwester-Sites** (Forchheim, Erlangen, Herzogenaurach). Die Bamberg-Site muss visuell und tonal zur Familie gehören, auch wenn der Stack abweicht.

**Astro-Mantra:** *Ship as little JavaScript as possible.* Jede `client:*`-Direktive muss begründbar sein. Default ist Zero-JS.

---

## 3. Stack (verbindlich)

### Core
- **Astro 6.3** mit `output: 'static'` (komplett statischer Build)
- **TypeScript strict** mit `astro/tsconfigs/strict`
- **Tailwind CSS** über `@astrojs/tailwind` (Vite-Plugin, kein separater Build-Step)
- **Netlify-Adapter** über `@astrojs/netlify` (auch wenn statisch – für spätere Edge-Functions vorgehalten)

### UI-Integrationen
- **React-Island nur für den Lead-Wizard** über `@astrojs/react`
  - Wizard nutzt `client:visible` oder `client:idle` (nicht `client:load`)
  - React 19, React DOM 19
- **Alle anderen Komponenten:** reine `.astro`-Dateien
- **Icons:** `lucide-astro` (statische SVG, kein JS)
- **Animationen:**
  - Scroll-Reveal: GSAP über `<script>`-Tag mit `client:idle`, ScrollTrigger nur wenn benötigt
  - Mikro-Animationen im Wizard: Framer Motion (innerhalb der React-Island)
  - Three.js Particle-Layer: separater `<script>` mit `client:idle`, dynamic import
- **Fonts:** Fraunces (Display) + Inter (Body) über Astros **Font API** (experimentell ab 5.x, stable in 6.x) oder klassisch über `<link rel="preconnect">` zu fonts.googleapis.com
- **Bilder:** `astro:assets` mit `<Image />` und `<Picture />` für AVIF + WebP automatisch

### Pflicht-Integrationen
```bash
npm install @astrojs/tailwind @astrojs/react @astrojs/sitemap @astrojs/netlify
npm install react react-dom @types/react @types/react-dom
npm install tailwindcss
npm install lucide-astro
npm install gsap framer-motion three
npm install -D @types/three
```

**Nicht erlaubt:**
- Keine UI-Library außerhalb des Astro-Ökosystems (kein MUI, Mantine, Chakra)
- Kein shadcn/ui (ist React-only und konflikiert mit dem Zero-JS-Ansatz)
- Keine globalen CSS-Files außer `src/styles/global.css` mit Tailwind-Direktiven
- Kein `client:load` auf Komponenten, die nicht **sofort** beim ersten Paint interaktiv sein müssen
- Kein SSR / On-Demand-Rendering (Site bleibt statisch)

---

## 4. Design-Tokens

Aus `tailwind.config.mjs`:

```js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#F2F4F8',
          100: '#E3E7EE',
          500: '#3D5A80',
          800: '#1E3050',
          900: '#142036',
          950: '#0A1424',
        },
        gold: {
          300: '#E8C77A',
          500: '#C9A646',
          600: '#A6862F',
          700: '#7D661F',
        },
        cream: {
          50:  '#FBF8F1',
          100: '#F5EFE2',
          200: '#EDE3CC',
        },
        ink: {
          DEFAULT: '#101826',
          soft:    '#2C3A50',
          muted:   '#5A6A82',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

**Hintergrundtexturen:**
- Default: `bg-cream-50`
- Sektionen wechseln Cream-50 ↔ Cream-100 für Rhythmus
- Dunkle Sektionen: `bg-navy-950` mit `BlurOrb`-Komponente (Gold, radial, 20 % Opacity)

**Buttons:**
- Primary: `bg-gold-500 text-navy-950 hover:bg-gold-600`
- Secondary: `bg-transparent border-navy-900 text-navy-900 hover:bg-navy-50`
- Rounded `rounded-md`, nie pillenförmig

---

## 5. Tonalität (Copy)

- **Sie-Form**, immer
- Sachlich, regional, ohne Übertreibungen
- Zahlen statt Adjektive: „600+ Banken" statt „viele Banken"
- Bamberg-spezifische Begriffe sind erlaubt, wenn natürlich: Welterbe, Inselstadt, Landkreis Bamberg, Brose, Bosch, Lagarde-Campus
- **Verboten:**
  - „Revolutionär", „innovativ", „bahnbrechend"
  - „In nur 3 Minuten zu Ihrem Traumhaus"
  - „KI-gestützte Beratung" (Christoph berät persönlich)
  - „Wir helfen Ihnen, Ihre Träume zu verwirklichen"

Wenn du beim Schreiben in eine dieser Floskeln rutschst, **stoppe und schreibe um**.

---

## 6. Astro-Komponenten-Konventionen

### 6.1 `.astro`-Dateien (Default)

```astro
---
// src/components/Hero.astro
import { Image } from 'astro:assets';
import heroImage from '@/assets/bamberg-altstadt.jpg';
import { HERO } from '@/lib/content';

interface Props {
  variant?: 'default' | 'compact';
}

const { variant = 'default' } = Astro.props;
---

<section id="hero" class="relative ...">
  <Image src={heroImage} alt="Bamberger Altstadt" widths={[400, 800, 1200, 1600]} />
  <h1 class="font-display ...">{HERO.headline}</h1>
  <!-- Slot für interaktive Komponenten (React-Island) -->
  <slot name="wizard" />
</section>
```

**Regeln:**
- Komponenten haben **Frontmatter** (zwischen `---`) für Imports + Props
- Props-Interface heißt immer `Props`
- Komponenten **named import**: `import { Hero } from '@/components/Hero.astro';` ist Astros Default-Form (über default-Export der Astro-Datei)
- Container max-width `max-w-7xl mx-auto`, padding `px-6 lg:px-12`
- Vertical spacing: `py-20 md:py-28` für Standard, `py-32` für Hero
- Headlines: `font-display`, body: `font-body`

### 6.2 React-Islands (nur Wizard)

```tsx
// src/components/wizard/LeadWizard.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export function LeadWizard() {
  const [step, setStep] = useState(0);
  // ...
}
```

Eingebunden in `page.astro` als:
```astro
---
import { LeadWizard } from '@/components/wizard/LeadWizard';
---
<LeadWizard client:visible />
```

**Direktive-Regeln:**
- `client:load` → niemals verwenden (zu teuer)
- `client:idle` → für Three.js Particles (kein UX-Schaden bei kurzer Verzögerung)
- `client:visible` → für den Wizard (lädt erst beim Scroll auf den Hero)
- `client:only="react"` → niemals verwenden (kaputtet SSR)

### 6.3 Skripte (für GSAP-Reveal etc.)

In `.astro`-Dateien als `<script>`-Tag am Seitenende:

```astro
<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  // Scroll-Reveal-Logik hier
</script>
```

Astro bundlet diese Scripts automatisch via Vite. **Kein `is:inline`** verwenden – das schaltet das Bundling aus.

---

## 7. Bamberg-spezifische Inhalts-Regeln

### 7.1 Hero-Untertitel erwähnt Stadt + Landkreis
> „Unabhängig, kostenlos und persönlich – für Bamberg, den Landkreis und Oberfranken."

### 7.2 Hero-Bild ist Welterbe-Altstadt (oder Lagarde-Campus)
- Keine Stockfotos von „happy family in front of house"
- Wenn Altes Rathaus / Klein-Venedig / Domplatz: dezent, nicht touristisch übersättigt
- Alternative: moderne Aufnahme Lagarde-Campus → zeigt: Bamberg ist nicht nur Altstadt
- **Astro-Vorteil:** Hero-Bild über `<Image priority />` mit explizitem `widths`-Array → bester LCP-Wert

### 7.3 Förderung-Sektion enthält Denkmalschutz-Block
Direkt unter KfW/BAFA/BayernLabo:
> **Denkmalschutz-Spezialfall.** Sie kaufen ein denkmalgeschütztes Objekt in der Bamberger Altstadt? Dann öffnen sich KfW 297/298 sowie steuerliche AfA-Sonderabschreibungen nach §7i EStG. Die Reihenfolge der Antragstellung entscheidet über mehrere tausend Euro – wir kennen sie.

### 7.4 FAQ enthält Brose/Bosch-Item und Denkmalschutz-Item
Siehe `src/lib/content.ts` → `FAQ_ITEMS`. **Implementierung als native `<details>`-Elemente** (Zero-JS):

```astro
{FAQ_ITEMS.map((item) => (
  <details class="group border-b border-navy-100 py-4">
    <summary class="cursor-pointer font-display text-lg flex justify-between">
      {item.question}
      <span class="transition-transform group-open:rotate-180">▾</span>
    </summary>
    <div class="pt-4 text-ink-soft" set:html={item.answer} />
  </details>
))}
```

### 7.5 RegionGrid hat 9 Karten
Reihenfolge nach Marktrelevanz:
1. Hirschaid (12.607 EW, Schaeffler-Standort)
2. Hallstadt (8.888 EW, Brose-HQ)
3. Memmelsdorf (8.822 EW, gehobenes Wohnen)
4. Strullendorf
5. Burgebrach (Thomann-Standort)
6. Scheßlitz
7. Litzendorf
8. Bischberg
9. Lagarde-Campus (Stadt-Neubaugebiet)

Letzte Card als Fallback: „Sie kommen aus einer anderen Gemeinde im Landkreis Bamberg? → Jetzt anfragen".

### 7.6 Marktdaten-Tabelle MUSS Stadt + 5 Landkreis-Gemeinden zeigen
Quelle: concept.md Abschnitt 3.1 / 3.2. Quelle als Fußzeile angeben.

---

## 8. Strikte Do-Nots

- **Kein Vergleich mit Forchheim/Erlangen/Herzogenaurach im sichtbaren Content.** Cross-Links nur dezent im Footer.
- **Keine konkreten Konditionen oder Zinssätze auf der Seite.** Christoph muss compliance-sicher bleiben. Statt „ab 3,4 %" → „aktuell günstige Konditionen, individuell ermittelt".
- **Keine Bilder von echten Personen, die nicht Christoph sind.** Falls Beraterfoto: nur Christoph.
- **Keine externen Tracking-Skripte ohne Cookie-Banner.** Für Phase 1: nur Google Analytics 4 mit `consent-mode v2`, default `denied` – integriert über `@astrojs/partytown` (lädt GA im Service Worker, Zero-Main-Thread-Cost).
- **Kein Login, kein Account-Bereich.** Onepager bleibt Onepager.
- **Keine `<form action="...">`-Lösungen, die clientseitig Daten verschicken.** Lead-Wizard verschickt via Astro Action (Phase 2) oder Netlify Form (Phase 1).
- **Kein `client:load`.** Wenn du es brauchst, hast du das Architekturproblem falsch gelöst.
- **Kein SSR.** Bleibt `output: 'static'`.

---

## 9. Repo-Struktur (Soll)

```
baufi-bamberg/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── netlify.toml
├── mirrors.md
├── public/
│   ├── llms.txt
│   ├── robots.txt
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── pages/
│   │   ├── index.astro          # Onepager
│   │   ├── impressum.astro
│   │   └── datenschutz.astro
│   ├── layouts/
│   │   └── BaseLayout.astro     # Header + Footer + SEO-Meta
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── StatsBar.astro
│   │   ├── ComparisonTable.astro
│   │   ├── Services.astro
│   │   ├── Foerderung.astro
│   │   ├── MarketData.astro
│   │   ├── MidPageCTA.astro
│   │   ├── RegionGrid.astro
│   │   ├── FAQ.astro
│   │   ├── Footer.astro
│   │   ├── wizard/
│   │   │   ├── LeadWizard.tsx   # React-Island
│   │   │   ├── WizardStep.tsx
│   │   │   └── WizardProgress.tsx
│   │   ├── three/
│   │   │   └── particle-field.ts  # Vanilla TS, kein React
│   │   └── util/
│   │       ├── BlurOrb.astro
│   │       └── Reveal.astro     # GSAP-Wrapper
│   ├── lib/
│   │   ├── content.ts           # Alle Texte, FAQs, Region-Karten
│   │   └── seo.ts               # Schema-Markup-Generatoren
│   ├── assets/                  # für astro:assets, optimierte Bilder
│   │   ├── bamberg-altstadt.jpg
│   │   ├── lagarde-campus.jpg
│   │   └── icons/
│   └── styles/
│       └── global.css           # Tailwind-Direktiven + CSS-Variablen
```

---

## 10. Wenn du unsicher bist

1. Lies `concept.md` (im Repo-Root) noch mal.
2. Schau dir die Forchheim-Seite an (`https://www.baufinanzierung-forchheim.de/`).
3. Schau in die Astro-Doku: `https://docs.astro.build`
4. Frag Niklas, **bevor** du eine Annahme triffst, die das Konzept verändert.

**Was du nicht selbst entscheidest:**
- Vom Astro-Stack abweichen (z. B. doch SSR aktivieren, doch shadcn einbauen)
- Sektionen weglassen oder umsortieren
- Neue Subpages außerhalb von Impressum/Datenschutz hinzufügen
- Andere Schriftarten oder Farben
- Tracking-Lösungen ohne Partytown-Wrapping integrieren
- `client:load` setzen

Alles andere – Komponenten-Architektur, Animations-Implementierung, GSAP-Timeline-Strukturen – kannst du eigenständig entscheiden, solange du im Stack bleibst und die Zero-JS-Maxime respektierst.

---

## 11. Astro-spezifische Performance-Checks vor dem Push

Bevor du einen Pull-Request machst:

- [ ] `npm run build` läuft ohne Warnings durch
- [ ] `dist/` enthält keine `.js`-Files >50 KB (Wizard-Bundle ausgenommen)
- [ ] Lighthouse Mobile ≥ 95 in **allen** Kategorien
- [ ] Astro Dev-Toolbar zeigt keine Audit-Warnings
- [ ] `<Image />` wird überall statt `<img>` verwendet (außer in `set:html` aus externen Quellen)
- [ ] Keine `client:load`-Direktiven im Code
- [ ] Tailwind-Klassen sind in den finalen CSS-Build aufgenommen (keine dynamisch zusammengesetzten Klassennamen)
