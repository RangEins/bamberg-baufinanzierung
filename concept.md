# Concept – Baufinanzierung Bamberg

**Projekt:** bamberg-baufinanzierung.de (Onepager)
**Kunde:** Christoph / Frankenbaufi
**Repo:** RangEins/baufi-bamberg
**Schwester-Sites:** baufinanzierung-forchheim.de, baufinanzierung-erlangen.de, baufinanzierung-herzogenaurach.de
**Tech-Stack:** Astro 6.3 (abweichend von den Next.js-Schwester-Sites)

---

## 0. Stack-Entscheidung Astro – Konsequenzen

**Bamberg läuft auf Astro 6.3, nicht auf Next.js.** Das ist eine bewusste Abweichung vom Stack der anderen drei Sites. Konsequenzen:

- **Vorteil:** Astro liefert bei Onepager-Sites mit überwiegend statischem Content nochmal kürzere LCP- und INP-Werte (Server-First-Rendering, Zero-JS by default).
- **Nachteil:** Zwei parallele Stacks bei Frankenbaufi. Bei Code-Sharing, Komponenten-Migration oder Bug-Fixes muss zwischen den Welten umgedacht werden.
- **Maßgabe für Phase 2:** Wenn Bamberg in Astro performant läuft, ist eine schrittweise Migration der drei Schwester-Sites auf Astro denkbar – aber nur, wenn der echte Performance-Gewinn nachweisbar ist. Sonst bleibt Bamberg der Astro-Exot.

**Visuelle Konsistenz bleibt 1:1.** Trotz unterschiedlichem Framework muss die Bamberg-Site optisch und tonal zu den Schwester-Sites passen. Gleiche Farben, gleiche Schriften, gleiche Sektionsabfolge.

---

## 1. Strategische Einordnung

### 1.1 Warum eine eigene Seite für Bamberg?

Bamberg ist die vierte Standort-Site im lokalen-SEO-Cluster von Frankenbaufi. Die Logik dahinter ist unverändert: Jede Region bekommt ihre eigene Domain mit eigener lokaler Autorität, eigenem Google-Business-Profil-Anschluss und eigenem Content – statt eine zentrale Seite mit /bamberg-Unterseite zu betreiben. Damit gewinnen alle vier Domains topical authority im jeweiligen Markt, ohne sich gegenseitig zu kannibalisieren.

Bamberg ist dabei aus mehreren Gründen die strategisch wichtigste der bisherigen Erweiterungen:

- **Größter Einzugsbereich der vier Sites:** Stadt Bamberg (~76.000 EW) + Landkreis Bamberg (~150.000 EW) = ~226.000 Einwohner im direkten Marktradius. Forchheim und Herzogenaurach sind deutlich kleinere Kreise.
- **Eigenes Mikroökosystem:** Bamberg ist nicht „Speckgürtel von Nürnberg/Erlangen", sondern eine eigenständige Wirtschafts- und Bildungsregion mit eigenem Nachfragezentrum.
- **Höchste Such-Volatilität:** „Baufinanzierung Bamberg" ist deutlich besser gesuchtes Keyword als „Baufinanzierung Herzogenaurach" (Bamberg hat überregionale Strahlkraft durch Welterbe, Uni, Brose-HQ).
- **Sehr heterogene Zielgruppe:** Studentenstadt + Industriearbeitnehmer (Brose, Bosch, Schaeffler) + Beamten-Region (Erzbistum, Landratsamt, Uni) + viele Denkmalschutz-Objekte. Das erlaubt in Phase 2 mehrere Subpages (siehe Phase-2-Backlog unten).

### 1.2 Abgrenzung zu Forchheim

Bamberg liegt ~25 km nördlich von Forchheim. Beide Sites laufen parallel, aber:

- **Forchheim deckt den Süden ab** (Landkreis Forchheim, Fränkische Schweiz, Anbindung Richtung Erlangen/Nürnberg).
- **Bamberg deckt den Norden ab** (Landkreis Bamberg, Anbindung Richtung Coburg/Bayreuth/Würzburg).
- **Kein Crosslinking in der Hero-Navigation**, nur dezent im Footer („Auch in Ihrer Region beraten").
- **Keine geteilten Inhalte** über Bamberg-Stadt selbst – jede Seite hat ihre eigene Marktbeschreibung.

---

## 2. Zielgruppe

### 2.1 Persona-Cluster

**Cluster A – Brose/Bosch/Schaeffler-Familien (Kernzielgruppe)**
Mittlere Einkommen, 30–45 Jahre, oft Pendler aus Landkreis-Gemeinden (Hallstadt, Hirschaid, Memmelsdorf, Strullendorf). Solider Job, will erstes Eigenheim oder Reihenhaus. Sucht „Baufinanzierung Bamberg" oder direkt „Baufinanzierung Hallstadt/Hirschaid".

**Cluster B – Bamberger Beamten- und Akademiker-Haushalte**
Uni-Mitarbeiter, Lehrer, Erzbistum-Angestellte, Verwaltung. 35–55 Jahre. Hohe Bonität, oft Doppelverdiener, suchen Altbau in der Innenstadt oder Reihenhaus in Wildensorg/Gartenstadt. Anspruchsvoller in der Beratung, oft Anschlussfinanzierung-Thema.

**Cluster C – Denkmalschutz-Käufer (Spezialfall)**
Käufer von Objekten im Welterbe-Gebiet oder Inselstadt. Brauchen Berater, der KfW-Denkmal, BayernLabo-Denkmalschutz und steuerliche AfA-Sonderabschreibungen kennt. Kleines Volumen, aber hochwertig und differenzierend (→ Phase-2-Subpage).

**Cluster D – Lagarde-Campus-Käufer**
Käufer von Neubauwohnungen im Konversionsgebiet (Lagarde, Pines, Offizierssiedlung). KfW-40-Förderung, oft junge Familien oder Kapitalanleger. Lagarde wird bis ca. 2028 weiter ausgebaut – stetiger Pool an Finanzierungsanfragen.

**Cluster E – Anschlussfinanzierung**
Bestandskunden aus den 2010er-Jahren, deren 10-jährige Zinsbindung ausläuft. Großer, stabiler Markt – braucht keine Akquise-Heroik, sondern saubere FAQ-Sektion und Forward-Darlehens-Erklärung.

### 2.2 Was alle eint

- Suchen auf Google nach „Baufinanzierung [Ort]" oder „[Ort] Baufinanzierung Vergleich"
- Wollen einen Menschen, kein Online-Tool (Check24-Müdigkeit)
- Wollen regional verankerte Beratung, kein Call-Center
- Erwarten 24h-Antwortzeit
- Sind misstrauisch gegenüber „kostenlos", verstehen aber Provisionsmodell, wenn es erklärt wird

---

## 3. Marktdaten Bamberg (Stand Mai 2026)

Quelle: Immowelt, Engel & Völkers, immoportal, mcmakler, ohne-makler – aggregiert.

### 3.1 Immobilienpreise Stadt Bamberg

| Segment | Ø-Preis | Spanne |
|---|---|---|
| Häuser | ~4.150 €/m² | 2.970 – 5.280 €/m² |
| Eigentumswohnungen | ~3.600 €/m² | 1.900 – 6.985 €/m² |
| Gesamtdurchschnitt | ~3.690 €/m² | – |

**Stadtteile (Spannweite):**
- **Teuerster Stadtteil:** Wildensorg (~3.886 €/m² gemittelt, Häuser bis ~5.250 €/m²)
- **Günstigster Stadtteil:** Hirschknock (~3.096 €/m²)
- **Mittelfeld mit Aufwärtstrend:** Gartenstadt, Gaustadt (jeweils +~2 % p.a.)
- **Premium-Lage:** Welterbe-Inselstadt – Preise stark objektabhängig, oft >5.500 €/m², viel Denkmalschutz

**Preisentwicklung 2025→2026:**
- Wohnungen: +2,7 % p.a.
- Häuser: stagnierend bis leicht rückläufig (-0,2 %)
- Mieten: Häuser 13,22 €/m², Wohnungen 13,41 €/m² (jeweils +~4 % p.a.)

### 3.2 Immobilienpreise Landkreis Bamberg

Deutlich günstiger als die Stadt, mit Preisspanne:
- Hallstadt: ~3.200 €/m² (Brose-Standort, hohe Nachfrage)
- Hirschaid: ~3.100 €/m² (Schaeffler-Standort, gute A73-Anbindung)
- Memmelsdorf: ~3.300 €/m² (gehobenes Wohnen, Schloss Seehof)
- Strullendorf: ~2.900 €/m²
- Burgebrach: ~2.500 €/m² (Thomann-HQ, ländlich)
- Scheßlitz: ~2.400 €/m²

### 3.3 Großarbeitgeber (für Persona-Targeting relevant)

**Stadt Bamberg:**
- **Robert Bosch GmbH** – Bosch Power Tools, größter Industrie-Arbeitgeber in der Stadt
- **Wieland Electric** – Elektrotechnik
- **Universität Bamberg** (Otto-Friedrich-Universität, ~12.000 Studierende, ~1.500 Mitarbeiter)
- **Erzbistum Bamberg** – einer der größten Arbeitgeber in der Region
- **Sparkasse Bamberg**, VR Bank Bamberg-Forchheim, Stadtwerke Bamberg
- **Klinikum Bamberg** (Sozialstiftung)
- **Bamberger Service Center der Telekom**

**Landkreis Bamberg:**
- **Brose Fahrzeugteile** – Hallstadt (Hauptverwaltung + Werk)
- **Schaeffler (INA)** – Hirschaid
- **Thomann GmbH** – Burgebrach (weltgrößter Versender für Musikequipment)
- **Steigerwaldklinik** Burgebrach, **Juraklinik** Scheßlitz
- **Maschinenbau Leicht** – Hallstadt

### 3.4 Konversionsflächen / Neubau-Hotspots

- **Lagarde-Campus** (~19,4 ha, Ostbamberg) – im Bau, Wohnungen + Gewerbe + Medical Valley + LAGARDE1-Gründerzentrum. Stetiger Finanzierungs-Bedarf bis ~2028+.
- **Pines Housing Area** – bereits in Wohnquartier umgewandelt
- **Offizierssiedlung** – Stadtbau Bamberg, günstiger Wohnungsbau
- **Muna** (~140 ha) – langfristiges Projekt
- **Flugplatz / Golfplatz** – kein Wohnbau, aber für Standortbild relevant

### 3.5 Einzugsgebiet (für /#region und llms.txt)

Stadt Bamberg (mit Stadtteilen Inselstadt, Bergstadt, Inselgebiet, Wildensorg, Gartenstadt, Gaustadt, Bug, Wunderburg) + die größten Landkreis-Gemeinden:

Hirschaid (12.607 EW) · Hallstadt (8.888) · Memmelsdorf (8.822) · Strullendorf · Burgebrach · Scheßlitz · Stegaurach · Litzendorf · Bischberg · Oberhaid · Buttenheim · Frensdorf · Pommersfelden · Schlüsselfeld · Heiligenstadt i. OFr. · Zapfendorf · Rattelsdorf · Baunach · Eltmann (angrenzend Hassberge) · Breitengüßbach · Kemmern · Gundelsheim

---

## 4. Strategische Bamberg-spezifische Akzente

### 4.1 Welterbe-Bezug als Vertrauenssignal
Bamberg ist UNESCO-Welterbe. Image-Asset für Bildsprache (Hero) und einen orts-spezifischen Absatz, aber **nicht überreizen**.

### 4.2 Denkmalschutz-Block in der Förderung-Sektion
> „Sie kaufen ein denkmalgeschütztes Objekt in der Bamberger Altstadt? KfW 297/298 und steuerliche AfA nach §7i EStG bieten erhebliche Vorteile – wir kennen die Reihenfolge."

### 4.3 Brose / Bosch / Schaeffler als Persona-Anker
FAQ-Item zu Industrie-Mitarbeitern (Schichtzulagen, Betriebszugehörigkeit, betriebliche Altersvorsorge).

### 4.4 Lagarde-Campus als Neubau-Anker
RegionGrid-Karte „Lagarde-Campus" mit KfW-40-Hinweis und Bauträger-Spezifika.

### 4.5 Tonalität: etwas urbaner als Herzogenaurach
Bamberg ist heterogener – Beamten, Industrie, Welterbe-Käufer. Sprache sachlich, mit Raum für Stadt-Charakter an einer Stelle.

---

## 5. SEO-Strategie

### 5.1 Primary Keywords
„Baufinanzierung Bamberg" · „Immobilienfinanzierung Bamberg" · „Baufinanzierung Bamberg Vergleich" · „Hypothek Bamberg" · „Anschlussfinanzierung Bamberg"

### 5.2 Long-Tail
„Baufinanzierung Hallstadt / Hirschaid / Memmelsdorf" · „Baufinanzierung Welterbe Bamberg" · „KfW Denkmalschutz Bamberg" · „Baufinanzierung Lagarde Campus" · „Baufinanzierung Brose Mitarbeiter"

### 5.3 On-Page-Setup
- `<title>`: „Baufinanzierung Bamberg – Unabhängig, kostenlos & persönlich | Frankenbaufi"
- Meta-Description (155 Z.): „Unabhängige Baufinanzierung für Bamberg und den Landkreis Bamberg. 600+ Banken im Vergleich, 25 Jahre Erfahrung in Franken. Kostenlose Erstberatung."
- Canonical: `https://bamberg-baufinanzierung.de/`
- Schema-Markup: `LocalBusiness` + `Service` + `FAQPage` (via Astro `<script type="application/ld+json">`)
- `areaServed`: ["Bamberg", "Landkreis Bamberg", "Oberfranken"]

### 5.4 Astro-spezifische SEO-Vorteile
- `astro:assets` mit automatischer Bildoptimierung (AVIF + WebP, responsive `srcset` automatisch)
- Zero-JS auf statischen Sektionen → kleinerer LCP, weniger CLS
- `@astrojs/sitemap` produziert sitemap-index.xml im Build automatisch
- View Transitions API für Page-Wechsel zwischen `/`, `/impressum`, `/datenschutz`

### 5.5 Interne Verlinkung
- Footer-Sektion „Auch in Ihrer Region beraten" → Forchheim, Erlangen, Herzogenaurach
- Mutterseite frankenbaufi.de → bamberg-baufinanzierung.de (Backlink nicht vergessen)

### 5.6 Off-Page (Phase 2)
- Google Business Profile für Bamberg
- Google Ads Search-Kampagne (Skill `google-ads-kampagne`)
- Backlinks: lokale Verzeichnisse Bamberg, Wirtschaftsförderung

---

## 6. Funktionale Anforderungen

### 6.1 Pflicht-Sektionen
1. Hero mit Lead-Wizard (4 Schritte, rechts) – **React-Island, einziges interaktives Element**
2. Stats-Leiste (600+ / 25 Jahre / 98 % / 24 h)
3. Hausbank-vs-Frankenbaufi Vergleichstabelle
4. Leistungen (4 Karten)
5. Förderung-Sektion mit Denkmalschutz-Block
6. Marktdaten Bamberg (Preistabelle Stadt + Landkreis)
7. MidPage-CTA mit Three.js (lazy via `client:idle`)
8. RegionGrid (9 Karten inkl. Lagarde-Campus)
9. FAQ-Accordion – **native `<details>`, Zero-JS**
10. Footer mit Cross-Links

### 6.2 Pflicht-Subpages
- `/impressum`
- `/datenschutz`

### 6.3 Pflicht-Dateien
- `astro.config.mjs` mit Tailwind, React, Sitemap, Netlify-Adapter
- `public/robots.txt`
- `public/llms.txt`
- `mirrors.md` im Repo-Root

### 6.4 Out of Scope (Phase 1)
- Kein Backend / kein CRM-Anschluss (Lead via Astro Action oder Netlify Form)
- Keine Mehrsprachigkeit
- Kein Blog / keine Content Collections
- **Keine On-Demand-Rendering** – Site komplett statisch (`output: 'static'`)

---

## 7. Phase-2-Backlog (nach Go-Live)

Reihenfolge nach erwartetem ROI:

1. **`/lagarde-campus`** – Konversionsgebiet-Subpage
2. **`/denkmalschutz-bamberg`** – Welterbe + KfW 297/298 + §7i EStG AfA
3. **`/brose-mitarbeiter`** – analog Siemens-Subpage in Erlangen
4. **`/baufinanzierung-hirschaid`** + **`/baufinanzierung-hallstadt`** + **`/baufinanzierung-memmelsdorf`** als Mini-Ortsseiten

**Astro-spezifisch:** Diese Subpages eignen sich ideal für Astros **Content Collections** mit MDX – jeder Ort wird ein MDX-File mit Frontmatter (Einwohner, Großarbeitgeber, Ø-Preis), das in ein gemeinsames `[slug].astro`-Layout gerendert wird. Skaliert auf 20+ Ortsseiten ohne Code-Duplizierung.

---

## 8. Abnahme-Kriterien Phase 1

- [ ] Live unter `https://bamberg-baufinanzierung.de` (statischer Build auf Netlify)
- [ ] Lighthouse-Score Mobile ≥ 95 in **allen vier Kategorien** – Astros Marketing-Versprechen messen wir hier
- [ ] LCP < 1,8 s auf langsamer 3G-Verbindung
- [ ] Lead-Wizard funktioniert (E-Mail-Versand an angebot@frankenbaufi.de)
- [ ] Alle Pflicht-Sektionen aus 6.1 vorhanden
- [ ] FAQ enthält mindestens 10 Items, davon mindestens 2 orts-spezifische
- [ ] Footer enthält Cross-Links zu allen 3 Schwester-Sites
- [ ] Impressum + Datenschutz live
- [ ] `llms.txt` unter Root erreichbar
- [ ] Sitemap (automatisch generiert) + robots korrekt
- [ ] `mirrors.md` im Repo aktualisiert (4 Sites, Bamberg als Astro markiert)
- [ ] frankenbaufi.de verlinkt auf die neue Seite
- [ ] **Astro-Spezial:** Build produziert <50 KB initiales JavaScript (Wizard-Island lazy-loaded)
