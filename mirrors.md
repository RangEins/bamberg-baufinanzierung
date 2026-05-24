# Mirrors – Schwester-Sites von Frankenbaufi

Vier Standort-Sites teilen sich Marke und Beraterprofil:

| Region          | URL                                       | Repo                          | Stack         |
|-----------------|-------------------------------------------|-------------------------------|---------------|
| Forchheim       | https://baufinanzierung-forchheim.de      | RangEins/baufi-forchheim      | Next.js 14    |
| Erlangen        | https://baufinanzierung-erlangen.de       | RangEins/baufi-erlangen       | Next.js 14    |
| Herzogenaurach  | https://baufinanzierung-herzogenaurach.de | RangEins/baufi-herzogenaurach | Next.js 14    |
| **Bamberg**     | https://bamberg-baufinanzierung.de        | RangEins/bamberg-baufinanzierung | **Astro 6.3** |

## Stack-Hinweis

Bamberg läuft als einzige Site auf **Astro 6.3** statt Next.js. Visuelle Sprache, Farbpalette
(Navy + Gold), Schriftarten (Fraunces + Inter) und Tonalität (Sie-Form, sachlich, regional)
sind identisch. Der Code-Stack unterscheidet sich: bei Komponenten-Übernahmen zwischen Sites
entsprechend übersetzen.

**Vorteile Astro:** Server-First-Rendering, Zero-JS auf statischen Sektionen, kleineres
Initial-Bundle, bessere LCP/INP-Werte. Einziges interaktives Element ist der Lead-Wizard
(React-Island via `client:visible`).

**Deployment:** Vercel (statischer Build, output: 'static'). Die anderen drei Sites laufen
auf ihrem etablierten Next.js-Vercel-Setup.

## Crosslink-Logik

Im Footer jeder Standort-Seite verweist eine Sektion „Auch in Ihrer Region beraten" auf die
drei Schwester-Sites. Damit gewinnen alle vier Domains topical authority, ohne in
Duplicate-Content-Fallen zu laufen. Keine sichtbaren Crosslinks in der Hauptnavigation oder
im Sektions-Content der Hero-Sektion.

## Geteilte Marke

- **NAP:** Frankenbaufi · angebot@frankenbaufi.de · 09131 6238530
- **Mutterseite:** frankenbaufi.de
- **Berater:** Christoph
- **Design-Sprache:** Navy (#0A1424–#3D5A80) + Gold (#C9A646–#E8C77A), Fraunces + Inter
- **Tonalität:** Sie-Form, sachlich, regional, keine Übertreibungen, keine konkreten Zinssätze
  auf der Seite (Compliance)

## Phase-2-Backlog Bamberg-Subpages

Nach Go-Live geplant (Astro Content Collections + MDX, `[slug].astro`):
1. `/lagarde-campus` – Konversionsgebiet
2. `/denkmalschutz-bamberg` – Welterbe + KfW 297/298 + §7i EStG
3. `/brose-mitarbeiter` – analog Siemens-Subpage in Erlangen
4. `/baufinanzierung-hirschaid` + `/baufinanzierung-hallstadt` + `/baufinanzierung-memmelsdorf`
