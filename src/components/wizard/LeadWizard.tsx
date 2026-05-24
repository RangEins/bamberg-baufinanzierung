import { useState, useMemo, useCallback, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Building2,
  Construction,
  Repeat,
  Wrench,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Phone,
  Mail,
  User,
  MapPin,
} from 'lucide-react';

type Vorhaben = 'hauskauf' | 'wohnungskauf' | 'neubau' | 'anschluss' | 'modernisierung';

interface FormState {
  vorhaben: Vorhaben | '';
  finanzierungssumme: number;
  eigenkapital: number;
  name: string;
  email: string;
  phone: string;
  ort: string;
  message: string;
  privacy: boolean;
  // Honeypot
  website: string;
}

const VORHABEN_OPTIONS: Array<{ value: Vorhaben; label: string; icon: typeof Home }> = [
  { value: 'hauskauf', label: 'Hauskauf', icon: Home },
  { value: 'wohnungskauf', label: 'Wohnungskauf', icon: Building2 },
  { value: 'neubau', label: 'Neubau', icon: Construction },
  { value: 'anschluss', label: 'Anschlussfinanzierung', icon: Repeat },
  { value: 'modernisierung', label: 'Modernisierung', icon: Wrench },
];

const STEP_LABELS = ['Vorhaben', 'Finanzierung', 'Eigenkapital', 'Kontakt'];

const formatEUR = (value: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

const initialState: FormState = {
  vorhaben: '',
  finanzierungssumme: 350_000,
  eigenkapital: 70_000,
  name: '',
  email: '',
  phone: '',
  ort: '',
  message: '',
  privacy: false,
  website: '',
};

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export function LeadWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const totalSteps = STEP_LABELS.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const canAdvance = useMemo(() => {
    if (step === 0) return !!form.vorhaben;
    if (step === 1) return form.finanzierungssumme >= 50_000;
    if (step === 2) return form.eigenkapital >= 0;
    if (step === 3)
      return (
        form.name.trim().length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
        form.privacy
      );
    return false;
  }, [step, form]);

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const next = useCallback(() => {
    if (canAdvance && step < totalSteps - 1) setStep((s) => s + 1);
  }, [canAdvance, step, totalSteps]);

  const back = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!canAdvance) return;

      // Honeypot — silent reject
      if (form.website.trim() !== '') {
        setSubmitState('success');
        return;
      }

      setSubmitState('sending');
      setErrorMessage('');

      try {
        const payload = new URLSearchParams();
        payload.append('form-name', 'lead');
        payload.append('vorhaben', form.vorhaben);
        payload.append('finanzierungssumme', String(form.finanzierungssumme));
        payload.append('eigenkapital', String(form.eigenkapital));
        payload.append('name', form.name);
        payload.append('email', form.email);
        payload.append('phone', form.phone);
        payload.append('ort', form.ort);
        payload.append('message', form.message);

        const res = await fetch('https://formsubmit.co/ajax/angebot@frankenbaufi.de', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `Neue Bamberg-Anfrage: ${form.vorhaben || 'Baufinanzierung'}`,
            _template: 'table',
            _captcha: 'false',
            Vorhaben: form.vorhaben,
            Finanzierungssumme: formatEUR(form.finanzierungssumme),
            Eigenkapital: formatEUR(form.eigenkapital),
            Name: form.name,
            Email: form.email,
            Telefon: form.phone || '–',
            Ort: form.ort || '–',
            Nachricht: form.message || '–',
            Quelle: 'bamberg-baufinanzierung.de',
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setSubmitState('success');
      } catch (err) {
        console.error('Lead submit failed', err);
        setSubmitState('error');
        setErrorMessage(
          'Übermittlung fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.',
        );
      }
    },
    [canAdvance, form],
  );

  if (submitState === 'success') {
    return (
      <div className="rounded-2xl border border-gold-300/30 bg-cream-50 p-8 shadow-2xl shadow-navy-950/30">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-gold-100">
            <CheckCircle2 className="size-8 text-gold-600" strokeWidth={2.5} />
          </div>
          <h3 className="mt-6 font-display text-2xl text-navy-950">Vielen Dank für Ihre Anfrage.</h3>
          <p className="mt-3 text-ink-soft">
            Wir melden uns innerhalb von 24 Stunden persönlich – per E-Mail oder telefonisch,
            ganz wie Sie es wünschen.
          </p>
          <a
            href="tel:+4991316238530"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-navy-900 px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-navy-800"
          >
            <Phone className="size-4" />
            Direkt anrufen: 09131 6238530
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gold-300/20 bg-cream-50 shadow-2xl shadow-navy-950/40">
      {/* Header */}
      <div className="border-b border-navy-100 bg-white px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
              Lead-Wizard · 4 Schritte
            </p>
            <h3 className="mt-1 font-display text-lg text-navy-950">
              Ihre kostenlose Erstberatung
            </h3>
          </div>
          <div className="text-sm font-medium text-ink-muted">
            {step + 1}/{totalSteps}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 flex gap-1.5">
          {STEP_LABELS.map((label, idx) => (
            <div
              key={label}
              className="h-1 flex-1 overflow-hidden rounded-full bg-navy-100"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{
                  width: idx < step ? '100%' : idx === step ? `${progress}%` : '0%',
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full bg-gold-500"
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-ink-muted">
          {STEP_LABELS.map((label, idx) => (
            <span
              key={label}
              className={idx === step ? 'font-semibold text-navy-900' : ''}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="px-6 py-6">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update('website', e.target.value)}
          className="hp-field"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="min-h-[280px]"
          >
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-xl text-navy-950">
                  Was möchten Sie finanzieren?
                </legend>
                <p className="mt-1.5 text-sm text-ink-muted">
                  Wählen Sie den Bereich, der Ihrem Vorhaben am nächsten kommt.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {VORHABEN_OPTIONS.map(({ value, label, icon: Icon }) => {
                    const active = form.vorhaben === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => update('vorhaben', value)}
                        className={`group flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left transition-all ${
                          active
                            ? 'border-gold-500 bg-gold-50 shadow-sm'
                            : 'border-navy-100 bg-white hover:border-gold-300 hover:bg-gold-50/40'
                        }`}
                      >
                        <Icon
                          className={`size-5 shrink-0 ${active ? 'text-gold-600' : 'text-navy-500'}`}
                          strokeWidth={1.75}
                        />
                        <span
                          className={`text-sm font-medium ${
                            active ? 'text-navy-950' : 'text-ink'
                          }`}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="font-display text-xl text-navy-950">
                  Welche Finanzierungssumme planen Sie?
                </legend>
                <p className="mt-1.5 text-sm text-ink-muted">
                  Ungefähre Größenordnung reicht – wir präzisieren im Erstgespräch.
                </p>
                <div className="mt-7 text-center">
                  <div className="font-display text-4xl text-navy-950">
                    {formatEUR(form.finanzierungssumme)}
                  </div>
                </div>
                <input
                  type="range"
                  min={50_000}
                  max={1_500_000}
                  step={10_000}
                  value={form.finanzierungssumme}
                  onChange={(e) => update('finanzierungssumme', Number(e.target.value))}
                  className="mt-6 w-full accent-gold-500"
                  aria-label="Finanzierungssumme"
                />
                <div className="mt-2 flex justify-between text-xs text-ink-muted">
                  <span>50.000 €</span>
                  <span>1,5 Mio. €</span>
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="font-display text-xl text-navy-950">
                  Wie viel Eigenkapital bringen Sie ein?
                </legend>
                <p className="mt-1.5 text-sm text-ink-muted">
                  Inklusive Bauspar- und Wertpapierdepots, ohne Bausparvertrag-Restschuld.
                </p>
                <div className="mt-7 text-center">
                  <div className="font-display text-4xl text-navy-950">
                    {formatEUR(form.eigenkapital)}
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500_000}
                  step={5_000}
                  value={form.eigenkapital}
                  onChange={(e) => update('eigenkapital', Number(e.target.value))}
                  className="mt-6 w-full accent-gold-500"
                  aria-label="Eigenkapital"
                />
                <div className="mt-2 flex justify-between text-xs text-ink-muted">
                  <span>0 €</span>
                  <span>500.000 €</span>
                </div>
                <p className="mt-5 rounded-md bg-cream-100 px-4 py-3 text-xs text-ink-soft">
                  Auch ohne Eigenkapital ist eine Finanzierung möglich – wir prüfen Ihre Optionen
                  individuell.
                </p>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset>
                <legend className="font-display text-xl text-navy-950">
                  Wie können wir Sie erreichen?
                </legend>
                <p className="mt-1.5 text-sm text-ink-muted">
                  Wir melden uns innerhalb von 24 Stunden persönlich.
                </p>
                <div className="mt-5 space-y-3">
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Name *"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="w-full rounded-lg border border-navy-100 bg-white py-3 pl-10 pr-3 text-sm placeholder:text-ink-muted focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="E-Mail *"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="w-full rounded-lg border border-navy-100 bg-white py-3 pl-10 pr-3 text-sm placeholder:text-ink-muted focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="Telefon"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="w-full rounded-lg border border-navy-100 bg-white py-3 pl-10 pr-3 text-sm placeholder:text-ink-muted focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                      <input
                        type="text"
                        autoComplete="address-level2"
                        placeholder="Ort"
                        value={form.ort}
                        onChange={(e) => update('ort', e.target.value)}
                        className="w-full rounded-lg border border-navy-100 bg-white py-3 pl-10 pr-3 text-sm placeholder:text-ink-muted focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300"
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Nachricht (optional) – z.B. Wunschtermin oder Besonderheiten"
                    rows={3}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full rounded-lg border border-navy-100 bg-white px-3.5 py-3 text-sm placeholder:text-ink-muted focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300"
                  />
                  <label className="flex items-start gap-2.5 pt-1 text-xs text-ink-soft">
                    <input
                      type="checkbox"
                      required
                      checked={form.privacy}
                      onChange={(e) => update('privacy', e.target.checked)}
                      className="mt-0.5 size-4 rounded border-navy-200 text-gold-500 focus:ring-gold-300"
                    />
                    <span>
                      Ich habe die{' '}
                      <a
                        href="/datenschutz"
                        className="underline underline-offset-2 hover:text-navy-900"
                      >
                        Datenschutzerklärung
                      </a>{' '}
                      gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner
                      Anfrage zu. *
                    </span>
                  </label>
                </div>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        {errorMessage && (
          <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-navy-100 pt-5">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-navy-900 disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
            Zurück
          </button>

          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance}
              className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-all hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Weiter
              <ArrowRight className="size-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canAdvance || submitState === 'sending'}
              className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition-all hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitState === 'sending' ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Wird gesendet
                </>
              ) : (
                <>
                  Anfrage absenden
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
