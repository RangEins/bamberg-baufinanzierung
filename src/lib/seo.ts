/**
 * Schema.org-Markup-Generatoren für maximale lokale SEO-Sichtbarkeit
 * und optimale Verständlichkeit für LLM-Crawler.
 *
 * Markenpolitik: name = "Baufinanzierung Bamberg" (sichtbare Marke).
 * legalName = "Frankenbaufi GmbH" (juristisch korrekt).
 * Beide Felder werden Schema.org-konform ausgegeben.
 */

import { SITE, FAQ_ITEMS, SERVICES } from './content';

const LANDKREIS_GEMEINDEN = [
  'Hirschaid',
  'Hallstadt',
  'Memmelsdorf',
  'Strullendorf',
  'Burgebrach',
  'Scheßlitz',
  'Litzendorf',
  'Bischberg',
  'Oberhaid',
  'Stegaurach',
  'Buttenheim',
  'Frensdorf',
  'Pommersfelden',
  'Schlüsselfeld',
  'Heiligenstadt in Oberfranken',
  'Zapfendorf',
  'Rattelsdorf',
  'Baunach',
  'Breitengüßbach',
  'Kemmern',
  'Gundelsheim',
] as const;

const STADTTEILE_BAMBERG = [
  'Inselstadt',
  'Bergstadt',
  'Wildensorg',
  'Gartenstadt',
  'Gaustadt',
  'Bug',
  'Wunderburg',
  'Lagarde-Campus',
] as const;

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${SITE.url}/#business`,
    name: SITE.brand,
    legalName: SITE.legalEntity.name,
    alternateName: ['Baufinanzierung Bamberg', 'Immobilienfinanzierung Bamberg'],
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    priceRange: 'kostenlos',
    image: `${SITE.url}/og-image.png`,
    logo: `${SITE.url}/logo.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.legalEntity.street,
      postalCode: SITE.legalEntity.zip,
      addressLocality: SITE.legalEntity.city,
      addressRegion: 'BY',
      addressCountry: SITE.legalEntity.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.8988,
      longitude: 10.9028,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Bamberg',
        '@id': 'https://www.wikidata.org/wiki/Q3936',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Landkreis Bamberg',
        '@id': 'https://www.wikidata.org/wiki/Q7919',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Oberfranken',
        '@id': 'https://www.wikidata.org/wiki/Q8201',
      },
      ...LANDKREIS_GEMEINDEN.map((g) => ({ '@type': 'City', name: g })),
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 49.8988,
        longitude: 10.9028,
      },
      geoRadius: '40000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Baufinanzierungs-Dienstleistungen',
      itemListElement: SERVICES.map((s, idx) => ({
        '@type': 'Offer',
        position: idx + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
      })),
    },
    knowsAbout: [
      'Baufinanzierung',
      'Immobilienfinanzierung',
      'Anschlussfinanzierung',
      'Forward-Darlehen',
      'KfW-Förderung',
      'BAFA-Förderung',
      'BayernLabo',
      'Denkmalschutz-Finanzierung',
      '§7i EStG AfA',
      'Welterbe Bamberg',
      'Lagarde-Campus Bamberg',
      'Brose-Mitarbeiter Finanzierung',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    slogan: 'Unabhängig, kostenlos und persönlich – für Bamberg, den Landkreis und Oberfranken.',
  };
}

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}/#service`,
    name: 'Baufinanzierungsvermittlung Bamberg',
    serviceType: 'Baufinanzierung',
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Bamberg' },
      { '@type': 'AdministrativeArea', name: 'Landkreis Bamberg' },
      { '@type': 'AdministrativeArea', name: 'Oberfranken' },
    ],
    audience: {
      '@type': 'Audience',
      audienceType: [
        'Erstkäufer von Wohneigentum',
        'Anschlussfinanzierer',
        'Modernisierer',
        'Industriearbeitnehmer (Brose, Bosch, Schaeffler)',
        'Denkmalschutz-Käufer',
      ],
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Erstberatung und Vermittlung sind für Kundinnen und Kunden kostenfrei.',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Service',
        name: s.title,
        description: s.description,
      })),
    },
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE.url}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.brand,
    legalName: SITE.legalEntity.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.legalEntity.street,
      postalCode: SITE.legalEntity.zip,
      addressLocality: SITE.legalEntity.city,
      addressCountry: SITE.legalEntity.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phoneTel,
      email: SITE.email,
      contactType: 'customer service',
      areaServed: 'DE',
      availableLanguage: ['German'],
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'de-DE',
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export { LANDKREIS_GEMEINDEN, STADTTEILE_BAMBERG };
