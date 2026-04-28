import {
  Heart, Award, Briefcase, Shield, Users, FileText, AlertTriangle, Sparkles, Clock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const KITS = [
  { id: 'marriage', price: '4.99', icon: Heart, titleKey: 'kitMarriageTitle', descKey: 'kitMarriageDesc' },
  { id: 'naturalization', price: '2.99', icon: Award, titleKey: 'kitNaturalizationTitle', descKey: 'kitNaturalizationDesc' },
  { id: 'h1b', price: '4.99', icon: Briefcase, titleKey: 'kitH1bTitle', descKey: 'kitH1bDesc' },
  { id: 'daca', price: '2.99', icon: Shield, titleKey: 'kitDacaTitle', descKey: 'kitDacaDesc' },
  { id: 'i130', price: '3.99', icon: Users, titleKey: 'kitI130Title', descKey: 'kitI130DescUS' },
  { id: 'asylum', price: '4.99', icon: FileText, titleKey: 'kitAsylumTitle', descKey: 'kitAsylumDesc' },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <div className="page-container max-w-6xl">
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

      {/* Kit grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {KITS.map(({ id, price, icon: Icon, titleKey, descKey }) => (
          <div
            key={id}
            className="card relative flex flex-col"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {/* Coming Soon ribbon */}
            <span
              className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
              style={{ backgroundColor: 'var(--color-accent-100)', color: 'var(--color-accent-800)' }}
            >
              <Clock className="h-3 w-3" />
              {t('servicesComingSoon')}
            </span>

            <div
              className="rounded-xl inline-flex p-3 mb-4 self-start"
              style={{ backgroundColor: 'var(--color-primary-50)' }}
            >
              <Icon className="h-6 w-6" style={{ color: 'var(--color-primary-500)' }} />
            </div>

            <h2
              className="text-lg font-bold mb-2 leading-snug pr-20"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              {t(titleKey)}
            </h2>

            <p className="text-sm flex-1 mb-5" style={{ color: 'var(--color-text-light)' }}>
              {t(descKey)}
            </p>

            <div className="flex items-end justify-between gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-secondary-500)' }}>
                  ${price}
                </span>
              </div>
              <button
                type="button"
                disabled
                className="rounded-full px-4 py-2.5 text-sm font-semibold cursor-not-allowed inline-flex items-center gap-1.5"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-light)',
                  border: '1px solid var(--color-border)',
                  minHeight: '40px',
                }}
              >
                <Clock className="h-3.5 w-3.5" />
                {t('servicesComingSoon')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div
        className="mt-10 rounded-lg p-4 flex items-start gap-3"
        style={{ backgroundColor: 'var(--color-warning-50)', border: '1px solid var(--color-accent-300)' }}
      >
        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent-700)' }} />
        <p className="text-sm" style={{ color: 'var(--color-accent-800)' }}>
          {t('servicesDisclaimer')}
        </p>
      </div>
    </div>
  );
}
