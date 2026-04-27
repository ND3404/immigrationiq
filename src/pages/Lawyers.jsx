import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink, MessageSquare, Shield, AlertTriangle, CheckCircle, HelpCircle, MapPin,
  Briefcase, Phone, Globe, Star, Calendar,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  lawyerResources, lawyerTips, legalAidByState, lawyerListings, practiceAreaKeys,
} from '../data/lawyers';
import LawyerTip from '../components/shared/LawyerTip';
import DisclaimerBanner from '../components/shared/DisclaimerBanner';

const PRACTICE_AREA_TKEY = {
  family: 'practiceAreaFamily',
  employment: 'practiceAreaEmployment',
  asylum: 'practiceAreaAsylum',
  deportation: 'practiceAreaDeportation',
  citizenship: 'practiceAreaCitizenship',
};

function LawyerListingCard({ lawyer, t }) {
  return (
    <div
      className="card relative"
      style={{
        borderColor: lawyer.featured ? 'var(--color-accent-500)' : 'var(--color-border)',
        borderWidth: lawyer.featured ? '2px' : '1px',
        backgroundColor: lawyer.featured ? 'var(--color-warning-50)' : '#ffffff',
      }}
    >
      {lawyer.featured && (
        <span
          className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white"
          style={{ backgroundColor: 'var(--color-accent-600)' }}
        >
          <Star className="h-3 w-3" fill="currentColor" /> {t('lawyersFeatured')}
        </span>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {lawyer.name}
          </h3>
          <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--color-primary-600)' }}>
            {lawyer.firm}
          </p>

          <div className="mt-2 space-y-1">
            <p className="text-sm flex items-start gap-1.5" style={{ color: 'var(--color-text-light)' }}>
              <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span>{lawyer.city}, {lawyer.state}</span>
            </p>
            <p className="text-sm flex items-start gap-1.5" style={{ color: 'var(--color-text-light)' }}>
              <Globe className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-semibold mr-1" style={{ color: 'var(--color-text)' }}>{t('lawyersLanguagesLabel')}:</span>
                {lawyer.languages.join(', ')}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {lawyer.practiceAreas.map((p) => (
              <span
                key={p}
                className="rounded-full px-2.5 py-1 text-xs font-medium"
                style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)' }}
              >
                {t(PRACTICE_AREA_TKEY[p])}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:w-52 flex-shrink-0 sm:items-end">
          <a
            href={`tel:${lawyer.phone.replace(/[^\d+]/g, '')}`}
            className="text-sm font-semibold no-underline inline-flex items-center gap-1.5 min-h-[40px]"
            style={{ color: 'var(--color-primary-600)' }}
          >
            <Phone className="h-3.5 w-3.5" /> {lawyer.phone}
          </a>
          <a
            href={lawyer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs no-underline inline-flex items-center gap-1 hover:underline"
            style={{ color: 'var(--color-text-light)' }}
          >
            <ExternalLink className="h-3 w-3" /> {t('lawyersWebsite')}
          </a>
          <a
            href={lawyer.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto text-sm whitespace-nowrap no-underline justify-center"
          >
            <Calendar className="h-4 w-4" /> {t('lawyersScheduleConsultation')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Lawyers() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('directory');
  const [stateFilter, setStateFilter] = useState('');
  const [practiceFilter, setPracticeFilter] = useState('');

  const tabs = [
    { id: 'directory', label: t('tabDirectory') },
    { id: 'guide', label: t('tabHowToChoose') },
    { id: 'resources', label: t('tabFindLawyer') },
    { id: 'legalaid', label: t('tabFreeLegalAid') },
  ];

  const availableStates = useMemo(
    () => [...new Set(lawyerListings.map((l) => l.state))].sort(),
    []
  );

  const filteredListings = useMemo(() => {
    const filtered = lawyerListings.filter((l) => {
      if (stateFilter && l.state !== stateFilter) return false;
      if (practiceFilter && !l.practiceAreas.includes(practiceFilter)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [stateFilter, practiceFilter]);

  return (
    <div className="page-container max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="section-title">{t('lawyers')}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--color-text-light)' }}>
          {t('lawyersIntro')}
        </p>
      </div>

      {/* Warning Banner */}
      <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: 'var(--color-danger-50)', border: '2px solid var(--color-secondary-500)' }}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 flex-shrink-0" style={{ color: 'var(--color-secondary-500)' }} />
          <div>
            <h3 className="font-bold text-base mb-1" style={{ color: 'var(--color-secondary-600)' }}>{t('lawyersWarningTitle')}</h3>
            <p className="text-sm" style={{ color: 'var(--color-text)' }}>
              {t('lawyersWarningBody')}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b overflow-x-auto whitespace-nowrap" style={{ borderColor: 'var(--color-border)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 min-h-[44px] text-sm font-semibold transition-colors border-b-2 -mb-px flex-shrink-0 ${activeTab === tab.id ? '' : 'border-transparent'}`}
            style={{
              borderColor: activeTab === tab.id ? 'var(--color-primary-500)' : 'transparent',
              color: activeTab === tab.id ? 'var(--color-primary-500)' : 'var(--color-text-light)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Directory Tab */}
      {activeTab === 'directory' && (
        <div className="space-y-5 animate-fade-in">
          <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
            {t('lawyersDirectoryIntro')}
          </p>

          {/* Get Listed CTA */}
          <div
            className="rounded-xl p-5 sm:p-6"
            style={{ background: 'linear-gradient(135deg, var(--color-secondary-600) 0%, var(--color-secondary-500) 100%)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-shrink-0 rounded-full p-2.5 self-start" style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}>
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {t('lawyersGetListedTitle')}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  {t('lawyersGetListedBody')}
                </p>
              </div>
              <Link
                to="/contact"
                className="rounded-full bg-white px-5 py-3 text-sm font-bold no-underline whitespace-nowrap inline-flex items-center justify-center self-start sm:self-auto flex-shrink-0"
                style={{ color: 'var(--color-secondary-600)', minHeight: '44px' }}
              >
                {t('lawyersGetListedCta')}
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="state-filter" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
                {t('lawyersFilterState')}
              </label>
              <select
                id="state-filter"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
                style={{ borderColor: 'var(--color-border)', minHeight: '44px', color: 'var(--color-text)' }}
              >
                <option value="">{t('lawyersFilterAll')}</option>
                {availableStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="practice-filter" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
                {t('lawyersFilterPractice')}
              </label>
              <select
                id="practice-filter"
                value={practiceFilter}
                onChange={(e) => setPracticeFilter(e.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
                style={{ borderColor: 'var(--color-border)', minHeight: '44px', color: 'var(--color-text)' }}
              >
                <option value="">{t('lawyersFilterAll')}</option>
                {practiceAreaKeys.map((k) => (
                  <option key={k} value={k}>{t(PRACTICE_AREA_TKEY[k])}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm font-semibold" style={{ color: 'var(--color-text-light)' }}>
            {t('lawyersResultsCount').replace('{count}', filteredListings.length)}
          </p>

          {/* Listings */}
          {filteredListings.length === 0 ? (
            <div className="card text-center text-sm" style={{ color: 'var(--color-text-light)' }}>
              {t('lawyersNoResults')}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredListings.map((lawyer) => (
                <LawyerListingCard key={lawyer.id} lawyer={lawyer} t={t} />
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <div
            className="rounded-lg p-3 flex items-start gap-2 mt-2"
            style={{ backgroundColor: 'var(--color-warning-50)', border: '1px solid var(--color-accent-300)' }}
          >
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent-700)' }} />
            <p className="text-xs" style={{ color: 'var(--color-accent-800)' }}>
              {t('lawyersDirectoryDisclaimer')}
            </p>
          </div>
        </div>
      )}

      {/* Guide Tab */}
      {activeTab === 'guide' && (
        <div className="space-y-6 animate-fade-in">
          {/* What to Look For */}
          <div className="card">
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              <CheckCircle className="h-5 w-5 inline mr-2" style={{ color: 'var(--color-success-500)' }} />
              {t('whatToLookFor')}
            </h2>
            <ul className="space-y-2">
              {lawyerTips.whatToLookFor.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-light)' }}>
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success-500)' }} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Questions to Ask */}
          <div className="card">
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              <HelpCircle className="h-5 w-5 inline mr-2" style={{ color: 'var(--color-primary-500)' }} />
              {t('questionsToAsk')}
            </h2>
            <ul className="space-y-2">
              {lawyerTips.questionsToAsk.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-light)' }}>
                  <span className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: 'var(--color-primary-500)' }}>{i + 1}</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Red Flags */}
          <div className="card">
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-secondary-500)' }}>
              <AlertTriangle className="h-5 w-5 inline mr-2" />
              {t('redFlagsTitle')}
            </h2>
            <ul className="space-y-2">
              {lawyerTips.redFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-secondary-500)' }} />
                  {flag}
                </li>
              ))}
            </ul>
          </div>

          {/* Notario Warning */}
          <LawyerTip title={t('notarioWarningTitle')} variant="warning">
            <p>{lawyerTips.notarioWarning}</p>
          </LawyerTip>

          {/* AI Suggestion */}
          <div className="card text-center">
            <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              {t('notSureLawyerTitle')}
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-light)' }}>
              {t('notSureLawyerBody')}
            </p>
            <Link to="/chat?q=I need help finding the right type of immigration lawyer. Can you ask me about my situation and recommend what specialty I should look for?" className="btn-primary no-underline">
              <MessageSquare className="h-4 w-4" /> {t('describeMySituation')}
            </Link>
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-4 animate-fade-in">
          {lawyerResources.map((res, i) => (
            <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="card flex items-start gap-4 no-underline">
              <div className="rounded-lg p-2 flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <Shield className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm flex items-center gap-1" style={{ color: 'var(--color-primary-600)' }}>
                  {res.name} <ExternalLink className="h-3 w-3" />
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-light)' }}>{res.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Legal Aid Tab */}
      {activeTab === 'legalaid' && (
        <div className="space-y-4 animate-fade-in">
          {legalAidByState.map((item, i) => (
            <div key={i} className="card">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-2" style={{ color: 'var(--color-text)' }}>
                <MapPin className="h-4 w-4" style={{ color: 'var(--color-primary-500)' }} />
                {item.state}
              </h3>
              <ul className="space-y-1">
                {item.organizations.map((org, j) => (
                  <li key={j} className="text-sm" style={{ color: 'var(--color-text-light)' }}>• {org}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
