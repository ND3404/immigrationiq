import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, MessageSquare, Shield, AlertTriangle, CheckCircle, HelpCircle, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { lawyerResources, lawyerTips, legalAidByState } from '../data/lawyers';
import LawyerTip from '../components/shared/LawyerTip';
import DisclaimerBanner from '../components/shared/DisclaimerBanner';

export default function Lawyers() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('guide');

  const tabs = [
    { id: 'guide', label: t('tabHowToChoose') },
    { id: 'resources', label: t('tabFindLawyer') },
    { id: 'legalaid', label: t('tabFreeLegalAid') },
  ];

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
