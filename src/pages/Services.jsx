import { useState } from 'react';
import {
  Heart, Award, Shield, FileText, AlertTriangle, Sparkles,
  GraduationCap, Lock, Download, BadgeCheck, Star, Trophy, Briefcase,
  Eye, Globe2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/shared/SEO';
import KitPreviewModal from '../components/shared/KitPreviewModal';

const KITS = [
  {
    id: 'marriage',
    price: '3.99',
    pages: 8,
    icon: Heart,
    titleKey: 'kitMarriageTitle',
    descKey: 'kitMarriageDesc',
    stripeUrl: 'https://buy.stripe.com/cNiaEPbCqbsU5Uj3SO7g403',
    esPdf: '/kits/Kit_Green_Card_Matrimonio_ES.pdf',
    badgeKey: 'servicesBadgeMostPopular',
    badgeKind: 'popular',
    previewBullets: {
      en: [
        'Step-by-step I-130 + I-485 filing process',
        'Complete document checklists (petitioner + beneficiary)',
        'Bona fide marriage evidence guide',
        'Interview preparation with common questions',
        'Filing fees breakdown',
        'Timeline estimates',
        'USCIS links and ImmigrationIQ tool references',
      ],
      es: [
        'Proceso paso a paso para I-130 + I-485',
        'Listas completas de documentos (peticionario + beneficiario)',
        'Guía de evidencia de matrimonio de buena fe',
        'Preparación para la entrevista con preguntas comunes',
        'Desglose de tarifas de presentación',
        'Estimaciones de tiempos',
        'Enlaces a USCIS y a las herramientas de ImmigrationIQ',
      ],
    },
  },
  {
    id: 'naturalization',
    price: '2.99',
    pages: 6,
    icon: Award,
    titleKey: 'kitNaturalizationTitle',
    descKey: 'kitNaturalizationDesc',
    stripeUrl: 'https://buy.stripe.com/5kQaEP49Y9kM3Mb4WS7g401',
    esPdf: '/kits/Kit_Naturalizacion_ES.pdf',
    previewBullets: {
      en: [
        'N-400 filing process step by step',
        'Eligibility checklist (5-year and 3-year rules)',
        'Civics test key topics overview',
        'English test preparation tips',
        'Document checklist',
        'Fees, exemptions, and timeline',
      ],
      es: [
        'Proceso de presentación del N-400 paso a paso',
        'Lista de elegibilidad (reglas de 5 y 3 años)',
        'Resumen de temas clave del examen cívico',
        'Consejos para preparar el examen de inglés',
        'Lista de documentos',
        'Tarifas, exenciones y línea de tiempo',
      ],
    },
  },
  {
    id: 'naturalization-exam',
    price: '3.99',
    pages: 9,
    icon: GraduationCap,
    titleKey: 'kitNaturalizationExamTitle',
    descKey: 'kitNaturalizationExamDesc',
    stripeUrl: 'https://buy.stripe.com/14A28j35U40s5Uj9d87g402',
    esPdf: '/kits/Kit_Examen_Ciudadania_ES.pdf',
    badgeKey: 'servicesBadgeBestValue',
    badgeKind: 'value',
    previewBullets: {
      en: [
        'All 100 civics questions with answers',
        'Organized by category: Government, History, Rights',
        'English reading and writing test tips',
        'Study strategies and timeline',
        'Practice recommendations',
        'Exemption rules for seniors',
      ],
      es: [
        'Las 100 preguntas cívicas con sus respuestas',
        'Organizadas por categoría: Gobierno, Historia, Derechos',
        'Consejos para los exámenes de lectura y escritura en inglés',
        'Estrategias de estudio y cronograma',
        'Recomendaciones de práctica',
        'Reglas de exención para adultos mayores',
      ],
    },
  },
  {
    id: 'daca',
    price: '2.99',
    pages: 6,
    icon: Shield,
    titleKey: 'kitDacaTitle',
    descKey: 'kitDacaDesc',
    stripeUrl: 'https://buy.stripe.com/eVqfZ90XMcwY6Yn4WS7g404',
    esPdf: '/kits/Kit_DACA_ES.pdf',
    previewBullets: {
      en: [
        'When and how to file your renewal',
        'I-821D + I-765 + I-765WS form guide',
        'Complete document checklist',
        'Common mistakes to avoid',
        'What to do if DACA already expired',
        'Current DACA legal status updates',
      ],
      es: [
        'Cuándo y cómo presentar tu renovación',
        'Guía de los formularios I-821D + I-765 + I-765WS',
        'Lista completa de documentos',
        'Errores comunes que debes evitar',
        'Qué hacer si tu DACA ya venció',
        'Actualizaciones sobre el estado legal de DACA',
      ],
    },
  },
  {
    id: 'eb1',
    price: '4.99',
    pages: 5,
    icon: Trophy,
    titleKey: 'kitEB1Title',
    descKey: 'kitEB1Desc',
    stripeUrl: 'https://buy.stripe.com/dRmfZ9bCq8gIciH8947g407',
    esStripeUrl: 'https://buy.stripe.com/fZufZ949YgNebeDblg7g408',
    previewBullets: {
      en: [
        'EB-1A, EB-1B, EB-1C comparison',
        '10 criteria for Extraordinary Ability',
        'Evidence strategies and tips',
        'Premium processing option',
        'Document checklist and fees',
      ],
      es: [
        'Comparación entre EB-1A, EB-1B y EB-1C',
        '10 criterios de Habilidad Extraordinaria',
        'Estrategias y consejos de evidencia',
        'Opción de procesamiento premium',
        'Lista de documentos y tarifas',
      ],
    },
  },
  {
    id: 'eb2',
    price: '4.99',
    pages: 3,
    icon: Star,
    titleKey: 'kitEB2Title',
    descKey: 'kitEB2Desc',
    stripeUrl: 'https://buy.stripe.com/7sYbITdKy9kM1E33SO7g406',
    esStripeUrl: 'https://buy.stripe.com/4gM3cneOC2Wo4Qf9d87g409',
    previewBullets: {
      en: [
        'EB-2 NIW National Interest Waiver strategy',
        'Dhanasar 3-prong framework',
        'PERM labor certification process',
        'EB-2 to EB-3 downgrade option',
        'Document checklist and timeline',
      ],
      es: [
        'Estrategia para la Exención por Interés Nacional (NIW) en EB-2',
        'Marco de 3 partes del caso Dhanasar',
        'Proceso de certificación laboral PERM',
        'Opción de downgrade de EB-2 a EB-3',
        'Lista de documentos y línea de tiempo',
      ],
    },
  },
  {
    id: 'eb3',
    price: '4.99',
    pages: 3,
    icon: Briefcase,
    titleKey: 'kitEB3Title',
    descKey: 'kitEB3Desc',
    stripeUrl: 'https://buy.stripe.com/28EeV58qe68AbeDexs7g405',
    esStripeUrl: 'https://buy.stripe.com/7sYbIT9uigNe1E360W7g40a',
    previewBullets: {
      en: [
        'Professionals, Skilled Workers, Other Workers',
        'Complete PERM process',
        'EB-2 downgrade strategy',
        'Employer sponsorship requirements',
        'Timeline by country',
      ],
      es: [
        'Profesionales, Trabajadores Calificados y Otros Trabajadores',
        'Proceso PERM completo',
        'Estrategia de downgrade desde EB-2',
        'Requisitos de patrocinio del empleador',
        'Línea de tiempo por país',
      ],
    },
  },
];

const TRUST_ITEMS = [
  { icon: Lock, key: 'servicesTrustStripe' },
  { icon: Download, key: 'servicesTrustInstantPdf' },
  { icon: BadgeCheck, key: 'servicesTrustGuarantee' },
];

export default function Services() {
  const { t } = useLanguage();
  const [previewKitId, setPreviewKitId] = useState(null);
  const previewKit = KITS.find((k) => k.id === previewKitId) || null;

  return (
    <div className="page-container max-w-6xl">
      <SEO
        title="Immigration Document Preparation Kits | Step-by-Step Guides | ImmigrationIQ"
        description="Affordable immigration document preparation kits with step-by-step guides for marriage green card, naturalization, DACA, and EB-1/EB-2/EB-3 employment visas."
        path="/services"
      />
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
          style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-600)' }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold uppercase tracking-wide">{t('services')}</span>
        </div>
        <h1 className="section-title">{t('servicesTitle')}</h1>
        <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
          {t('servicesIntro')}
        </p>
      </div>

      {/* Kit grid — soft gradient backdrop */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{
          background: 'linear-gradient(180deg, var(--color-primary-50) 0%, #ffffff 70%)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KITS.map((kit) => {
            const { id, price, pages, icon: Icon, titleKey, descKey, stripeUrl, esPdf, esStripeUrl, badgeKey, badgeKind } = kit;
            return (
              <div
                key={id}
                className="card relative flex flex-col"
                style={{
                  borderColor:
                    badgeKind === 'popular' ? 'var(--color-secondary-500)' :
                    badgeKind === 'value' ? 'var(--color-success-500)' :
                    'var(--color-border)',
                  borderWidth: badgeKey ? '2px' : '1px',
                }}
              >
                {/* Featured badge */}
                {badgeKey && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm"
                    style={{
                      backgroundColor: badgeKind === 'popular' ? 'var(--color-secondary-500)' : 'var(--color-success-500)',
                      color: '#ffffff',
                    }}
                  >
                    {t(badgeKey)}
                  </span>
                )}

                <div
                  className="rounded-xl inline-flex p-3 mb-4 self-start"
                  style={{ backgroundColor: 'var(--color-primary-50)' }}
                >
                  <Icon className="h-6 w-6" style={{ color: 'var(--color-primary-500)' }} />
                </div>

                <h2
                  className="text-lg font-bold mb-2 leading-snug"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                >
                  {t(titleKey)}
                </h2>

                <p className="text-sm mb-3" style={{ color: 'var(--color-text-light)' }}>
                  {t(descKey)}
                </p>

                {/* EN/ES badge + page count */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] mb-5 mt-auto">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold"
                    style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)' }}
                  >
                    <Globe2 className="h-3 w-3" />
                    {t('servicesCardLanguageNote')}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium"
                    style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-light)', border: '1px solid var(--color-border)' }}
                  >
                    <FileText className="h-3 w-3" />
                    {pages} {t('servicesPreviewPagesLabel')}
                  </span>
                </div>

                <div className="pt-4 border-t flex flex-col gap-2" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold" style={{ fontFamily: 'var(--font-heading)', color: '#2c5282', fontSize: '21px' }}>
                      ${price}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewKitId(id)}
                      aria-label={`${t('servicesPreview')} — ${t(titleKey)}`}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors hover:bg-[var(--color-primary-50)]"
                      style={{
                        backgroundColor: '#ffffff',
                        color: 'var(--color-primary-600)',
                        border: '2px solid var(--color-primary-500)',
                        minHeight: '36px',
                      }}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {t('servicesPreview')}
                    </button>
                  </div>
                  <a
                    href={stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t('servicesBuyNow')} — $${price}`}
                    className="buy-now-btn w-full rounded-full px-4 py-2.5 text-sm font-semibold no-underline inline-flex items-center justify-center gap-1.5 transition-colors"
                    style={{ backgroundColor: '#003087', color: '#ffffff', minHeight: '44px' }}
                  >
                    <Lock className="h-4 w-4" />
                    {t('servicesBuyNow')} — ${price}
                  </a>
                  {esStripeUrl ? (
                    <a
                      href={esStripeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t('servicesBuySpanish')} — $${price}`}
                      className="w-full rounded-full px-4 py-2.5 text-sm font-semibold no-underline inline-flex items-center justify-center gap-1.5 transition-colors hover:bg-[var(--color-primary-50)]"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#003087',
                        border: '2px solid #003087',
                        minHeight: '44px',
                      }}
                    >
                      <Lock className="h-4 w-4" />
                      {t('servicesBuySpanish')} — ${price}
                    </a>
                  ) : esPdf ? (
                    <a
                      href={esPdf}
                      download
                      aria-label={`${t('servicesFreeSpanishDownload')} — ${t(titleKey)}`}
                      className="w-full rounded-full px-4 py-2.5 text-sm font-semibold no-underline inline-flex items-center justify-center gap-1.5 transition-colors hover:bg-[var(--color-primary-50)]"
                      style={{
                        backgroundColor: '#ffffff',
                        color: 'var(--color-primary-700)',
                        border: '2px solid var(--color-primary-500)',
                        minHeight: '44px',
                      }}
                    >
                      <Download className="h-4 w-4" />
                      {t('servicesFreeSpanishDownload')}
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust bar */}
      <div
        className="mt-8 rounded-xl px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
        style={{ backgroundColor: 'var(--color-primary-50)', border: '1px solid var(--color-primary-200)' }}
      >
        {TRUST_ITEMS.map(({ icon: Icon, key }) => (
          <div key={key} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--color-primary-700)' }}>
            <span className="rounded-full p-1.5 flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-100)' }}>
              <Icon className="h-4 w-4" style={{ color: 'var(--color-primary-600)' }} />
            </span>
            <span className="font-medium">{t(key)}</span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div
        className="mt-6 rounded-lg p-4 flex items-start gap-3"
        style={{ backgroundColor: 'var(--color-warning-50)', border: '1px solid var(--color-accent-300)' }}
      >
        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent-700)' }} />
        <p className="text-sm" style={{ color: 'var(--color-accent-800)' }}>
          {t('servicesDisclaimer')}
        </p>
      </div>

      {/* Preview modal */}
      <KitPreviewModal
        kit={previewKit}
        open={!!previewKit}
        onClose={() => setPreviewKitId(null)}
      />
    </div>
  );
}
