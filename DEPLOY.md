# Deploy & Production-Workflow

Operative Anleitung für Push und Production-Deployment dieser Site.

---

## Tech-Stack (Kurzfassung)

- **Framework:** Astro 6.3 (`output: 'static'`)
- **Adapter:** `@astrojs/vercel` (statisches Build-Artefakt)
- **Styling:** Tailwind v4 via `@tailwindcss/vite@4.1.18` (gepinnt – siehe Fallstricke)
- **React-Island:** Lead-Wizard (`client:visible`), kein Framer Motion mehr
- **Fonts:** `@fontsource-variable/inter` + `@fontsource-variable/fraunces` (self-hosted)
- **Form-Backend:** Web3Forms (POST an `https://api.web3forms.com/submit`)

---

## Repository & Hosting

| Ressource         | Wert                                                     |
| ----------------- | -------------------------------------------------------- |
| GitHub Repo       | `RangEins/bamberg-baufinanzierung`                       |
| Default-Branch    | `main`                                                   |
| Vercel-Projekt    | `bamberg-baufinanzierung` (mit dem Repo verknüpft)       |
| Production-Domain | `https://bamberg-baufinanzierung.de`                     |
| Redirect          | `www.bamberg-baufinanzierung.de` → Apex (308 Permanent)  |
| Trigger           | **Push auf `main` → Vercel deployt automatisch live**    |

Kein Staging/Preview-Branch eingerichtet (Solo-Setup). Vercel erzeugt automatisch Preview-Deployments für jeden Push auf andere Branches und für jeden Pull Request, falls man später welche aufmacht.

---

## Standard-Workflow

### 1. Änderungen lokal verifizieren

```bash
npm run build
```

Muss ohne Errors durchlaufen. Warnings ("chunks larger than 500 kB") sind OK – das betrifft das Three.js-Bundle (Particle-Layer im MidPageCTA), das lazy-loaded ist und nur auf Desktop läuft.

Optional kurz vorhin testen:
```bash
npm run dev       # http://localhost:4321
npm run preview   # serviert den Build aus dist/
```

### 2. Commit (Style-Konvention)

```bash
git add -A
git commit -m "$(cat <<'EOF'
Kurze Zusammenfassung (Subject, eine Zeile, kein Punkt am Ende)

Body mit erklärendem Kontext – WHY, nicht WHAT.
Mehrere Absätze sind OK. Umlaute hier als ae/oe/ue/ss schreiben
(macht weniger Probleme in manchen Git-UIs und mailmap-Pipelines).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### 3. Push → Production

```bash
git push origin main
```

Vercel detektiert den Push, baut auf eigener Infrastruktur und published die neue Version auf der Production-Domain. Build dauert typischerweise 30–90 Sekunden.

Status nachsehen: Vercel-Dashboard → Projekt → Deployments-Tab.

---

## Domain & SSL

- **Apex (`bamberg-baufinanzierung.de`):** Primary, serviert die Seite direkt
- **www:** redirected mit 308 Permanent auf Apex
- **SSL:** Let's Encrypt, Vercel managed automatisch (Auto-Renewal)
- **DNS-Provider:** united-domains (udag)
  - `bamberg-baufinanzierung.de` → `A 216.150.1.1` (Vercel Anycast)
  - `www.bamberg-baufinanzierung.de` → `CNAME 3651587f3502ffb1.vercel-dns-016.com`

DNS muss in der Regel nicht angefasst werden. Falls doch (z. B. Vercel-Migration), erscheint im Vercel-Dashboard pro Domain ein konkreter Hinweis mit den nötigen Records.

---

## Fallstricke

### Tailwind v4 ist auf 4.1.18 gepinnt

Astro 6 nutzt eine Rolldown-basierte Vite-Version. Ab `@tailwindcss/vite@4.2.0+` bricht der Build mit:
```
Missing field `tsconfigPaths` on BindingViteResolvePluginConfig.resolveOptions
```

**Daher: `@tailwindcss/vite` und `tailwindcss` nicht hochziehen, bevor das aufgelöst ist.** Beobachtet werden kann das in den Astro/Tailwind-Release-Notes.

### Kein `vite.resolve.alias` in `astro.config.mjs`

Astro 6 respektiert die `paths` aus `tsconfig.json` automatisch. Eine manuelle Vite-Alias-Konfiguration (`vite.resolve.alias = { '@': '/src' }`) bricht ebenfalls mit dem oben genannten Rolldown-Fehler.

### Mobile Layout-Stabilität

`<meta name="viewport" content="..., viewport-fit=cover">` ist gesetzt. Konsequenz:

- Der Header braucht `padding-top: env(safe-area-inset-top)` (in `Header.astro` CSS)
- Hero und Subpages brauchen `pt-[calc(<basis>+env(safe-area-inset-top,0px))]`
- `html { scroll-padding-top: calc(5rem + env(safe-area-inset-top, 0px)) }` ist gesetzt, damit Anker-Links (`#anfragen` etc.) das Ziel nicht hinter dem fixed Header positionieren

Beim Hinzufügen neuer Anker-Targets oder Hero-Varianten daran denken.

### Header-State-Toggle

Der Header schaltet zwischen transparent (über dem dunklen Hero) und opak-cream (gescrollt). Triggered durch einen `IntersectionObserver` auf einem Sentinel oberhalb des Hero – **nicht** durch einen `scroll`-Event-Listener (das wäre Mobile-Performance-Killer durch Repaint-Spam).

---

## Drittanbieter im Datenfluss

| Anbieter         | Zweck                | Standort | Rechtsgrundlage / Notes                                |
| ---------------- | -------------------- | -------- | ------------------------------------------------------ |
| Vercel           | Hosting + CDN        | USA      | DPF + AVV liegen vor                                   |
| Web3Forms        | Lead-Form-Submission | Indien   | Art. 49 Abs. 1 lit. a DSGVO via Wizard-Consent-Checkbox |
| `@fontsource-*`  | Fonts (self-hosted)  | —        | Keine externen Requests                                |

Web3Forms Access-Key liegt im `LeadWizard.tsx` als Klartext-String. Das ist ein **Public-Key**, kein Secret – Web3Forms bindet ihn an die E-Mail-Adresse, an die geliefert wird, nicht an Auth.

Vercel Web Analytics ist in `astro.config.mjs` **deaktiviert**. Cookie-Banner deckt aber bereits "Statistik & Marketing" als Opt-in-Kategorie ab, falls später eine Aktivierung gewünscht ist.

---

## Pflicht-Files / SEO-Assets

| Pfad                     | Zweck                                    |
| ------------------------ | ---------------------------------------- |
| `/sitemap-index.xml`     | Auto-generiert durch `@astrojs/sitemap`  |
| `/robots.txt`            | Explizite Allow-Liste für AI-Crawler     |
| `/llms.txt`              | LLM-optimierte Sitebeschreibung          |
| `/favicon.svg`           | Browser-Tab-Icon                         |
| `/logo.svg`              | Brand-Wordmark für OG / externes Sharing |
| `/profilbild.webp`       | Berater-Avatar (Wizard + Footer)         |

---

## Letzte To-Dos vor finalem Live-Schalten

Im `/impressum` ist noch ein Platzhalter offen:

- **Vermittlerregister-Nummer nach § 34i GewO** (im Quelltext mit eckigen Klammern markiert)

Sobald die eingetragen ist, ist das Impressum vollständig.
