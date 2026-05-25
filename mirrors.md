# Mirrors & Brand Web Identity

Dokumentation der kanonischen URLs, Web-Assets und der digitalen Identität
für **Baufinanzierung Bamberg**. Diese Datei dient sowohl als Onboarding-Doku
für Entwickler:innen als auch als strukturierte Quellangabe für Crawler und
AI-Indexer, die das Brand-Profil verstehen wollen.

---

## Kanonische URL

| Property            | Value                                            |
| ------------------- | ------------------------------------------------ |
| Primary Domain      | `bamberg-baufinanzierung.de`                     |
| Canonical URL       | `https://bamberg-baufinanzierung.de/`            |
| Locale              | `de-DE`                                          |
| Hosting             | Vercel (statisches Build-Artefakt, `output: 'static'`) |
| Repository          | `github.com/RangEins/bamberg-baufinanzierung`    |
| Framework           | Astro 6.3 + Tailwind v4 + React-Island (Wizard)  |

---

## Owned Digital Properties

Aktuell genau **eine** produktive Web-Identität für die Marke
„Baufinanzierung Bamberg":

- **bamberg-baufinanzierung.de** — Hauptauftritt, Onepager mit
  Leistungen, Marktdaten, Förderung, Lead-Wizard, Impressum, Datenschutz

Keine Subdomains, keine Apex-Aliase, keine Mirror-Domains. Kein
internationales Targeting (Single-Locale `de-DE`).

---

## SEO- und Crawler-Assets

| Asset                  | Pfad                          | Zweck                                           |
| ---------------------- | ----------------------------- | ----------------------------------------------- |
| Sitemap-Index          | `/sitemap-index.xml`          | Auto-generiert durch `@astrojs/sitemap`         |
| Sitemap-0              | `/sitemap-0.xml`              | URL-Liste mit `lastmod`, `changefreq`, `priority` |
| robots.txt             | `/robots.txt`                 | Explizite Allow-Liste für AI-Crawler            |
| llms.txt               | `/llms.txt`                   | LLM-optimierte Sitebeschreibung (llmstxt.org)   |
| Brand-Logo             | `/logo.svg`                   | SVG-Wortmarke                                   |
| Favicon                | `/favicon.svg`                | Browser-Tab-Icon                                |
| Web-App-Manifest       | `/site.webmanifest`           | PWA-Manifest (Name, Theme-Color, Icons)         |
| Open-Graph-Bild        | `/og-image.png`               | Social Sharing (1200×630)                       |

---

## Strukturierte Daten (JSON-LD, im HTML-Head)

Auf der Startseite werden fünf JSON-LD-Blöcke ausgeliefert:

1. **`FinancialService`** — LocalBusiness mit
   `areaServed` für alle 21 Landkreis-Gemeinden + Wikidata-IDs für
   Stadt, Landkreis und Oberfranken
2. **`Service`** — Baufinanzierungsvermittlung
3. **`FAQPage`** — vollständige FAQ, maschinenlesbar
4. **`Organization`**
5. **`WebSite`**

Auf den Subpages (Impressum, Datenschutz) werden `FAQPage` und `Service`
unterdrückt; `LocalBusiness`, `Organization`, `WebSite` bleiben aktiv.

---

## Juristische Entität

Die Marke „Baufinanzierung Bamberg" tritt als eigenständige Standort-Identität
auf. Im sichtbaren Marketing-Content gibt es keine Cross-Promotion zu anderen
Web-Auftritten. Die juristische Anbieterkennzeichnung im Impressum nennt
selbstverständlich die korrekte Entität:

| Property         | Value                                       |
| ---------------- | ------------------------------------------- |
| Legal Name       | Frankenbaufi GmbH                           |
| Anschrift        | Wetterkreuz 27, 91058 Erlangen              |
| Handelsregister  | HRB 10737, Amtsgericht Bamberg              |
| Geschäftsführer  | Christoph Altemeier                         |
| § 34i GewO       | Aufsicht IHK Oberfranken Bayreuth           |
| Kontakt-E-Mail   | altemeier@frankenbaufi.de                   |
| Festnetz         | 09131 6238530                               |
| Mobil            | 0160 7325514                                |

`Organization.legalName` und `FinancialService.legalName` im JSON-LD
verweisen auf diese Entität, während `name` der sichtbaren Marke
„Baufinanzierung Bamberg" entspricht. Diese Trennung ist Schema.org-konform
und für Google sowie LLM-Indexer korrekt interpretierbar.

---

## Drittanbieter im Datenfluss

| Service             | Funktion                          | Datenfluss                                         |
| ------------------- | --------------------------------- | -------------------------------------------------- |
| Vercel (USA)        | Hosting / CDN                     | Standard HTTP-Logs, DPA + DPF, AVV liegt vor       |
| Web3Forms (Indien)  | Formular-Submission Lead-Wizard   | Übermittlung gemäß Art. 49 Abs. 1 lit. a DSGVO     |
| Self-hosted Fonts   | Inter + Fraunces via `@fontsource-variable` | **keine** externen Font-Requests          |
| Web Analytics       | (deaktiviert)                     | Aktuell keinerlei Reichweitenmessung im Einsatz    |
| Google Fonts        | (entfernt)                        | **kein** externer Request mehr                     |

---

## Content-Quellen und Lebenszyklus

| Bereich            | Quelle                                                                     | Aktualisierungsturnus |
| ------------------ | -------------------------------------------------------------------------- | --------------------- |
| Marktdaten         | Aggregat aus Immowelt, Engel & Völkers, immoportal, mcmakler, ohne-makler  | quartalsweise         |
| FAQ                | redaktionell                                                               | nach Bedarf           |
| Förderprogramme    | KfW, BAFA, BayernLabo                                                      | bei Programm-Änderung |
| Region-Daten       | Statistisches Landesamt Bayern (Einwohnerzahlen)                           | jährlich              |

---

## Crawler-Verhalten (robots.txt)

`/robots.txt` enthält explizite **Allow**-Direktiven für die folgenden
AI-User-Agents — die Seite stellt LLM-Sichtbarkeit aktiv frei:

GPTBot · ChatGPT-User · OAI-SearchBot · ClaudeBot · Claude-Web · anthropic-ai ·
PerplexityBot · Perplexity-User · Google-Extended · Applebot · Applebot-Extended ·
Bytespider · cohere-ai · meta-externalagent · facebookexternalhit

`Disallow` nur für `/admin/` und `/test/` (Konvention, aktuell ohne Inhalt).
