/**
 * Zentraler Content-Store für die Baufinanzierung-Bamberg-Seite.
 * Alle Texte hier hinterlegen, damit Komponenten textfrei bleiben.
 *
 * Markenpolitik: "Baufinanzierung Bamberg" ist die sichtbare Marke der Seite.
 * Die juristische Entität (Frankenbaufi GmbH) wird ausschließlich im
 * Impressum/Datenschutz genannt – nicht im sichtbaren Marketing-Content.
 */

export const SITE = {
  /** Sichtbare Marke der Seite */
  name: 'Baufinanzierung Bamberg',
  brand: 'Baufinanzierung Bamberg',
  brandShort: 'Bamberg',
  brandTagline: 'Baufinanzierung',

  domain: 'bamberg-baufinanzierung.de',
  url: 'https://bamberg-baufinanzierung.de',

  /** Kontakt – sichtbar auf der Seite */
  email: 'altemeier@frankenbaufi.de',
  phone: '09131 6238530',
  phoneTel: '+4991316238530',
  mobile: '0160 7325514',
  mobileTel: '+491607325514',

  city: 'Bamberg',
  region: 'Landkreis Bamberg',
  state: 'Bayern',

  description:
    'Unabhängige Baufinanzierung für Bamberg und den Landkreis Bamberg. 600+ Banken im Vergleich, 25 Jahre Erfahrung in Franken. Kostenlose Erstberatung.',

  /** Juristische Entität – NUR Impressum/Datenschutz/Schema */
  legalEntity: {
    name: 'Frankenbaufi GmbH',
    street: 'Wetterkreuz 27',
    zip: '91058',
    city: 'Erlangen',
    country: 'DE',
    register: 'HRB 10737',
    registerCourt: 'Amtsgericht Bamberg',
    representative: 'Christoph Altemeier',
  },
} as const;

export const NAV_ITEMS = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Förderung', href: '#foerderung' },
  { label: 'Marktdaten', href: '#marktdaten' },
  { label: 'Region', href: '#region' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const HERO = {
  badge: 'Unabhängige Baufinanzierung · Bamberg & Landkreis',
  headline: 'Ihre Baufinanzierung für Bamberg.',
  headlineAccent: 'Persönlich. Unabhängig. Kostenfrei.',
  subtitle:
    'Über 600 Banken im Vergleich – von der Welterbe-Altstadt bis in den Landkreis. Persönliche Antwort innerhalb von 24 Stunden.',
  trustBadges: [
    '600+ Banken im Vergleich',
    '25 Jahre Markterfahrung',
    'Antwort in 24 Stunden',
  ],
  cta: 'Kostenlose Erstberatung anfragen',
  ctaSecondary: 'Direkt anrufen',
} as const;

export const STATS_ITEMS = [
  {
    value: '600+',
    label: 'Banken im Vergleich',
    detail: 'Konditionen aus dem gesamten Markt',
  },
  {
    value: '25',
    label: 'Jahre Erfahrung',
    detail: 'in Franken vor Ort',
  },
  {
    value: '98 %',
    label: 'Weiterempfehlung',
    detail: 'durch unsere Kundinnen und Kunden',
  },
  {
    value: '24 h',
    label: 'Antwortzeit',
    detail: 'persönliche Rückmeldung',
  },
] as const;

export const COMPARISON_ROWS = [
  {
    feature: 'Anzahl verglichener Banken',
    hausbank: 'Nur eigene Produkte',
    us: 'Über 600 Banken im Vergleich',
  },
  {
    feature: 'Beratungsgebühr',
    hausbank: 'Im Produkt eingepreist',
    us: 'Kostenlos für Sie',
  },
  {
    feature: 'Regionale Marktkenntnis',
    hausbank: 'Generische Bewertung',
    us: 'Bamberg und Landkreis seit 2001',
  },
  {
    feature: 'KfW- & BAFA-Förderprüfung',
    hausbank: 'Häufig nicht vollständig',
    us: 'Standard im Erstgespräch',
  },
  {
    feature: 'Denkmalschutz-Expertise',
    hausbank: 'Spezialfall, oft Auslagerung',
    us: 'KfW 297/298 + §7i EStG vertraut',
  },
  {
    feature: 'Forward-Darlehen Vergleich',
    hausbank: 'Eigene Kondition',
    us: 'Marktweiter Vergleich',
  },
  {
    feature: 'Persönlicher Ansprechpartner',
    hausbank: 'Wechselnde Berater',
    us: 'Ein fester Ansprechpartner',
  },
  {
    feature: 'Antwortzeit auf Erstanfrage',
    hausbank: 'Mehrere Tage üblich',
    us: 'Innerhalb von 24 Stunden',
  },
] as const;

export const SERVICES = [
  {
    icon: 'Home',
    title: 'Immobilienfinanzierung',
    description:
      'Hauskauf, Wohnungskauf oder Neubau in Bamberg, im Landkreis oder im weiteren Oberfranken – wir finden die passende Kombination aus Zinsbindung, Tilgung und Förderung.',
    anchor: '#anfragen',
  },
  {
    icon: 'Repeat',
    title: 'Anschlussfinanzierung',
    description:
      'Wenn Ihre Zinsbindung ausläuft: Wir prüfen marktweit und sichern Ihre Anschlussfinanzierung – auch als Forward-Darlehen bis 60 Monate im Voraus.',
    anchor: '#anfragen',
  },
  {
    icon: 'Wrench',
    title: 'Modernisierung & Sanierung',
    description:
      'Energetische Sanierung, Dachausbau, Heizungstausch – mit KfW- und BAFA-Programmen reduzieren Sie Ihre monatliche Rate und steigern den Wert Ihrer Immobilie.',
    anchor: '#anfragen',
  },
  {
    icon: 'Coins',
    title: 'Förderprüfung & Denkmalschutz',
    description:
      'KfW 124/261/297/298, BAFA, BayernLabo und §7i EStG-AfA bei Denkmalschutz – wir kennen die Reihenfolge und reizen Förderungen vollständig aus.',
    anchor: '#foerderung',
  },
] as const;

export const FOERDERUNG_ITEMS = [
  {
    title: 'KfW – Wohneigentum & Klimaschutz',
    items: [
      'KfW 124 – Wohneigentumsprogramm',
      'KfW 261 – Wohngebäude (Sanierung)',
      'KfW 297/298 – Klimafreundlicher Neubau / Wohneigentum für Familien',
      'KfW 358/359 – Jung kauft Alt (energetische Sanierung)',
    ],
  },
  {
    title: 'BAFA – Bundesamt',
    items: [
      'Heizungstausch (bis 70 % Zuschuss)',
      'Bundesförderung effiziente Gebäude (BEG EM)',
      'Solarthermie- und Wärmepumpen-Boni',
      'Energieberatung Wohngebäude',
    ],
  },
  {
    title: 'BayernLabo – Landesförderung',
    items: [
      'Bayerisches Baudarlehen',
      'Bayerisches Modernisierungsdarlehen',
      'Bayerisches Zinsverbilligungsprogramm',
      'Sonderprogramm Denkmalschutz',
    ],
  },
] as const;

export const FOERDERUNG_HINT =
  'Förderzusage muss vor dem Notartermin vorliegen. Eine nachträgliche Antragstellung ist ausgeschlossen – die Reihenfolge entscheidet über mehrere tausend Euro.';

export const DENKMALSCHUTZ_NOTE = {
  title: 'Denkmalschutz-Spezialfall Bamberger Altstadt',
  body: 'Sie kaufen ein denkmalgeschütztes Objekt in der Bamberger Altstadt oder Inselstadt? Dann öffnen sich KfW 297/298 sowie steuerliche AfA-Sonderabschreibungen nach §7i EStG. Über die erhöhte Denkmal-AfA können Sanierungskosten in den ersten 12 Jahren deutlich beschleunigt abgeschrieben werden. Die Reihenfolge der Antragstellung – Bescheid der Unteren Denkmalschutzbehörde vor Baubeginn – entscheidet über mehrere tausend Euro. Wir kennen die Stolperfallen.',
} as const;

export const MARKET_DATA_STADT = {
  title: 'Stadt Bamberg',
  asOf: 'Stand Mai 2026',
  rows: [
    { segment: 'Häuser', avg: '~4.150 €/m²', range: '2.970 – 5.280 €/m²' },
    { segment: 'Eigentumswohnungen', avg: '~3.600 €/m²', range: '1.900 – 6.985 €/m²' },
    { segment: 'Gesamtdurchschnitt', avg: '~3.690 €/m²', range: '–' },
  ],
  highlights: [
    'Teuerster Stadtteil: Wildensorg (~3.886 €/m²)',
    'Günstigster Stadtteil: Hirschknock (~3.096 €/m²)',
    'Premium-Lage: Welterbe-Inselstadt, oft >5.500 €/m²',
    'Mietpreise: Häuser 13,22 €/m², Wohnungen 13,41 €/m²',
  ],
} as const;

export const MARKET_DATA_LANDKREIS = {
  title: 'Landkreis Bamberg',
  asOf: 'Stand Mai 2026',
  rows: [
    { segment: 'Hallstadt', avg: '~3.200 €/m²', range: 'Brose-Standort' },
    { segment: 'Hirschaid', avg: '~3.100 €/m²', range: 'Schaeffler, A73' },
    { segment: 'Memmelsdorf', avg: '~3.300 €/m²', range: 'Gehobenes Wohnen' },
    { segment: 'Strullendorf', avg: '~2.900 €/m²', range: 'Familien-Region' },
    { segment: 'Burgebrach', avg: '~2.500 €/m²', range: 'Thomann-HQ' },
    { segment: 'Scheßlitz', avg: '~2.400 €/m²', range: 'Ländlich, ruhig' },
  ],
} as const;

export const MARKET_SOURCES =
  'Quellen: Immowelt, Engel & Völkers, immoportal, mcmakler, ohne-makler (Stand Mai 2026). Angaben gerundet, individuelle Lage und Objektzustand können erheblich abweichen.';

export const REGION_CARDS = [
  {
    name: 'Hirschaid',
    badge: '12.607 EW · A73',
    stats: ['Schaeffler-Standort', '~3.100 €/m²', '15 km nach Bamberg'],
    description:
      'Größte Gemeinde im Landkreis mit direkter A73-Anbindung. Schaeffler (INA) als Hauptarbeitgeber, dazu wachsender Pendlerstrom Richtung Erlangen und Bamberg.',
    fallback: false,
  },
  {
    name: 'Hallstadt',
    badge: '8.888 EW · Brose-HQ',
    stats: ['Brose Hauptverwaltung', '~3.200 €/m²', '6 km nach Bamberg'],
    description:
      'Brose-Hauptverwaltung und Werk prägen die Gemeinde. Stetige Nachfrage durch Brose-Mitarbeiter und Pendler aus dem nördlichen Landkreis.',
    fallback: false,
  },
  {
    name: 'Memmelsdorf',
    badge: '8.822 EW · Schloss Seehof',
    stats: ['Gehobenes Wohnen', '~3.300 €/m²', '7 km nach Bamberg'],
    description:
      'Memmelsdorf gilt als gehobene Wohnlage des Landkreises. Schloss Seehof, gute Schul- und Kita-Infrastruktur, hohe Nachfrage von Beamten- und Akademiker-Haushalten.',
    fallback: false,
  },
  {
    name: 'Strullendorf',
    badge: '8.000+ EW · Familien',
    stats: ['Familien-Region', '~2.900 €/m²', '10 km nach Bamberg'],
    description:
      'Wachsende Familien-Gemeinde mit guter A73-Anbindung. Solide Preisniveau, gute Mischung aus Bestand und Neubau in den Ortsteilen.',
    fallback: false,
  },
  {
    name: 'Burgebrach',
    badge: 'Thomann-HQ',
    stats: ['Weltgrößter Musikversand', '~2.500 €/m²', '18 km nach Bamberg'],
    description:
      'Heimat der Thomann GmbH – weltgrößter Versender für Musikequipment. Ländlich geprägt, gute Preise, Steigerwaldklinik als zweiter großer Arbeitgeber.',
    fallback: false,
  },
  {
    name: 'Scheßlitz',
    badge: 'Juraklinik',
    stats: ['Ländlich · Ruhig', '~2.400 €/m²', '15 km nach Bamberg'],
    description:
      'Günstigste Lage im Landkreis-Mittelfeld. Juraklinik als Hauptarbeitgeber, attraktiv für Familien mit überschaubarem Budget.',
    fallback: false,
  },
  {
    name: 'Litzendorf',
    badge: 'Schwarzwald-Flair',
    stats: ['Wohnen im Grünen', 'Preise nach Lage', '8 km nach Bamberg'],
    description:
      'Direkt am Fränkische-Schweiz-Rand. Beliebt bei Familien, die Stadt-Nähe mit Naturanschluss kombinieren wollen.',
    fallback: false,
  },
  {
    name: 'Bischberg',
    badge: 'Main-Lage',
    stats: ['Main-Aue', 'Reihenhäuser etabliert', '5 km nach Bamberg'],
    description:
      'Direkt am Main, kurze Wege in die Stadt. Etablierte Reihenhaus-Siedlungen, stetige Nachfrage durch Bestands- und Anschlussfinanzierungen.',
    fallback: false,
  },
  {
    name: 'Lagarde-Campus',
    badge: '19,4 ha · KfW-40',
    stats: ['Konversionsgebiet', 'Bauträger-Neubau', 'Stadt Bamberg Ost'],
    description:
      'Größtes Konversionsgebiet Bambergs. Wohnungen, Gewerbe, Medical Valley, LAGARDE1-Gründerzentrum. Stetiger Pool an Bauträger-Finanzierungen bis 2028+.',
    fallback: false,
  },
  {
    name: 'Andere Landkreis-Gemeinde?',
    badge: 'Wir beraten überall',
    stats: ['Oberhaid · Stegaurach', 'Buttenheim · Frensdorf', 'Heiligenstadt · u.v.m.'],
    description:
      'Wir beraten in allen Gemeinden des Landkreises Bamberg sowie im weiteren Oberfranken. Schildern Sie uns kurz Ihr Vorhaben – wir melden uns innerhalb von 24 Stunden.',
    fallback: true,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Was kostet die Beratung?',
    answer:
      'Vollständig kostenlos. Wir erhalten unsere Provision von der Bank, die den Kredit vergibt – nicht von Ihnen. Sie zahlen den gleichen Zinssatz wie bei einer direkten Bankanfrage, häufig günstiger, weil wir über 600 Anbieter vergleichen.',
  },
  {
    question: 'Warum nicht direkt zur Hausbank?',
    answer:
      'Die Hausbank verkauft nur eigene Produkte. Wir vergleichen über 600 Banken und finden dadurch in den allermeisten Fällen günstigere Konditionen – ohne dass Sie sich durch Vergleichsportale arbeiten müssen.',
  },
  {
    question: 'Wie schnell bekomme ich eine Rückmeldung?',
    answer:
      'Innerhalb von 24 Stunden melden wir uns persönlich – per Telefon oder E-Mail, ganz wie Sie es wünschen. Erstgespräch und konkreter Konditionsvergleich sind innerhalb einer Woche möglich.',
  },
  {
    question: 'Beraten Sie auch im Landkreis Bamberg?',
    answer:
      'Ja. Hirschaid, Hallstadt, Memmelsdorf, Strullendorf, Burgebrach, Scheßlitz, Litzendorf, Bischberg, Oberhaid, Stegaurach, Buttenheim, Frensdorf, Pommersfelden, Schlüsselfeld, Heiligenstadt, Zapfendorf, Rattelsdorf, Baunach, Breitengüßbach, Kemmern, Gundelsheim – wir sind in allen Gemeinden des Landkreises Bamberg tätig.',
  },
  {
    question: 'Was unterscheidet die Bamberger Welterbe-Altstadt von anderen Lagen?',
    answer:
      'Objekte in der Welterbezone sind oft denkmalgeschützt. Das öffnet KfW 297/298 sowie steuerliche AfA-Sonderabschreibungen nach §7i EStG – aber nur in der richtigen Reihenfolge. Der Bescheid der Unteren Denkmalschutzbehörde muss vor Baubeginn vorliegen. Wir kennen die Stolperfallen.',
  },
  {
    question: 'Ich arbeite bei Brose, Bosch oder Schaeffler – worauf muss ich achten?',
    answer:
      'Industriearbeitnehmer in der Region haben typischerweise eine sehr gute Bonität bei Banken: lange Betriebszugehörigkeit, planbare Schichtzulagen, oft betriebliche Altersvorsorge. Das müssen Sie in der Antragstellung richtig aufzeigen – sonst bewertet die Bank Ihr Einkommen unter Ihrem tatsächlichen Wert. Wir bereiten Ihre Unterlagen so auf, dass Schichtzuschläge und Sonderzahlungen voll angerechnet werden.',
  },
  {
    question: 'Was ist ein Forward-Darlehen und ab wann lohnt es sich?',
    answer:
      'Ein Forward-Darlehen sichert die heutigen Zinsen für eine Anschlussfinanzierung, die erst in 1–5 Jahren startet. Lohnt sich besonders bei steigenden Zinsen – der Vorteil hängt von der erwarteten Zinsentwicklung und der individuellen Restschuld ab. Wir rechnen Ihre konkrete Situation marktweit durch.',
  },
  {
    question: 'Wie lange dauert eine komplette Finanzierung von der Anfrage bis zur Auszahlung?',
    answer:
      'Bei sauberen Unterlagen üblicherweise 4–6 Wochen. Erstgespräch und Konditionsvergleich sind innerhalb einer Woche möglich. Engpässe entstehen meistens beim Notartermin oder bei der Bewertung – nicht bei der Bank.',
  },
  {
    question: 'Was ist mit Lagarde-Campus und anderen Konversionsflächen?',
    answer:
      'Lagarde, Pines, Offizierssiedlung – das sind oft Neubauten mit KfW-40-Standard oder besser, also mit attraktiven Förderkonditionen. Bei Bauträger-Modellen gibt es Spezifika (Kaufpreisraten nach MaBV, Fertigstellungsbürgschaft, Eintragung im Grundbuch), die wir gemeinsam durchgehen.',
  },
  {
    question: 'Wer steht hinter dieser Beratung?',
    answer:
      'Hinter Baufinanzierung Bamberg steht ein unabhängiger Vermittler mit 25 Jahren Markterfahrung in Franken. Sie haben einen festen Ansprechpartner über die gesamte Laufzeit – vom Erstgespräch über den Notartermin bis zur Auszahlung. Die rechtlichen Anbieterangaben finden Sie im Impressum.',
  },
] as const;

export const MIDPAGE_CTA = {
  eyebrow: 'Konkreter Vergleich in 24 Stunden',
  headline: 'Wir vergleichen für Sie. Sie sparen Zinsen.',
  subline:
    'Schildern Sie uns Ihr Vorhaben – Hauskauf, Anschluss oder Modernisierung. Wir melden uns persönlich mit einem ersten konkreten Konditionsbild für den Bamberger Markt.',
  cta: 'Jetzt unverbindlich anfragen',
} as const;

export const SISTER_SITES = [
  {
    name: 'Baufinanzierung Forchheim',
    url: 'https://baufinanzierung-forchheim.de',
    label: 'Forchheim',
  },
  {
    name: 'Baufinanzierung Erlangen',
    url: 'https://baufinanzierung-erlangen.de',
    label: 'Erlangen',
  },
  {
    name: 'Baufinanzierung Herzogenaurach',
    url: 'https://baufinanzierung-herzogenaurach.de',
    label: 'Herzogenaurach',
  },
] as const;

export const FOOTER_LINKS = {
  leistungen: [
    { label: 'Immobilienfinanzierung', href: '#leistungen' },
    { label: 'Anschlussfinanzierung', href: '#leistungen' },
    { label: 'Modernisierung', href: '#leistungen' },
    { label: 'Förderprüfung', href: '#foerderung' },
    { label: 'Denkmalschutz', href: '#foerderung' },
  ],
  regionen: [
    { label: 'Stadt Bamberg', href: '#marktdaten' },
    { label: 'Hirschaid', href: '#region' },
    { label: 'Hallstadt', href: '#region' },
    { label: 'Memmelsdorf', href: '#region' },
    { label: 'Lagarde-Campus', href: '#region' },
  ],
  informationen: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
} as const;

export const WIZARD_OPTIONS = {
  vorhaben: [
    { value: 'hauskauf', label: 'Hauskauf', icon: 'Home' },
    { value: 'wohnungskauf', label: 'Wohnungskauf', icon: 'Building2' },
    { value: 'neubau', label: 'Neubau', icon: 'Construction' },
    { value: 'anschluss', label: 'Anschlussfinanzierung', icon: 'Repeat' },
    { value: 'modernisierung', label: 'Modernisierung', icon: 'Wrench' },
  ],
} as const;
