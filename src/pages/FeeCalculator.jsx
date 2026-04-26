import { useState, useMemo } from 'react';
import { Calculator, RotateCcw, Printer, ExternalLink, AlertTriangle, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DisclaimerBanner from '../components/shared/DisclaimerBanner';

const visaTypes = [
  { id: 'i130', form: 'I-130', name: 'Family Petition (Alien Relative)', fee: 675 },
  { id: 'i485-adult', form: 'I-485', name: 'Adjustment of Status (Adult)', fee: 1440, childFee: 950 },
  { id: 'i131', form: 'I-131', name: 'Travel Document (Advance Parole)', fee: 630 },
  { id: 'i765', form: 'I-765', name: 'Employment Authorization (EAD)', fee: 520 },
  { id: 'i751', form: 'I-751', name: 'Remove Conditions on Residence', fee: 595 },
  { id: 'i90', form: 'I-90', name: 'Green Card Renewal/Replacement', fee: 455 },
  { id: 'n400', form: 'N-400', name: 'Application for Naturalization', fee: 760 },
  { id: 'i129f', form: 'I-129F', name: 'K-1 Fiancé(e) Petition', fee: 675 },
  { id: 'ds160', form: 'DS-160', name: 'Nonimmigrant Visa Application', fee: 185 },
  { id: 'h1b', form: 'H-1B', name: 'H-1B Specialty Occupation Filing', fee: 730 },
];

const PREMIUM_PROCESSING_FEE = 2805;
const BIOMETRICS_FEE = 85;
const MEDICAL_EXAM_FEE = 350; // average estimate

export default function FeeCalculator() {
  const { t } = useLanguage();
  const [selectedVisa, setSelectedVisa] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [premiumProcessing, setPremiumProcessing] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  const [medicalExam, setMedicalExam] = useState(false);

  const visa = visaTypes.find(v => v.id === selectedVisa);

  const breakdown = useMemo(() => {
    if (!visa) return [];
    const items = [];
    const adultFee = visa.fee;
    const childFee = visa.childFee ?? visa.fee;
    const adultsLabel = t('feeAdults');
    const childrenLabel = t('feeChildren');
    const personLabel = t('perPerson');

    if (adults > 0) {
      items.push({ label: `${visa.form} — ${adults} ${adultsLabel} × $${adultFee.toLocaleString()}`, amount: adults * adultFee });
    }
    if (children > 0) {
      items.push({ label: `${visa.form} — ${children} ${childrenLabel} × $${childFee.toLocaleString()}`, amount: children * childFee });
    }
    const totalPersons = adults + children;
    if (biometrics && totalPersons > 0) {
      items.push({ label: `${t('feeBiometrics')} — ${totalPersons} × $${BIOMETRICS_FEE} (${personLabel})`, amount: totalPersons * BIOMETRICS_FEE });
    }
    if (medicalExam && totalPersons > 0) {
      items.push({ label: `${t('feeMedicalExam')} — ${totalPersons} × ~$${MEDICAL_EXAM_FEE} (${personLabel}, ${t('estimate')})`, amount: totalPersons * MEDICAL_EXAM_FEE });
    }
    if (premiumProcessing) {
      items.push({ label: t('feePremiumProcessing'), amount: PREMIUM_PROCESSING_FEE });
    }
    return items;
  }, [visa, adults, children, premiumProcessing, biometrics, medicalExam, t]);

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  const handleReset = () => {
    setSelectedVisa('');
    setAdults(1);
    setChildren(0);
    setPremiumProcessing(false);
    setBiometrics(false);
    setMedicalExam(false);
  };

  return (
    <div className="page-container max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-lg p-2.5" style={{ backgroundColor: 'var(--color-primary-50)' }}>
            <Calculator className="h-6 w-6" style={{ color: 'var(--color-primary-500)' }} />
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {t('feeCalculatorTitle')}
          </h1>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-light)' }}>
          {t('feeCalculatorSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Inputs */}
        <div className="lg:col-span-3 space-y-5">
          {/* Visa Type Selector */}
          <div className="card">
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>
              {t('feeApplicationType')}
            </label>
            <select
              value={selectedVisa}
              onChange={(e) => setSelectedVisa(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
              style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-body)', color: selectedVisa ? 'var(--color-text)' : 'var(--color-text-light)' }}
            >
              <option value="">{t('feeSelectVisa')}</option>
              {visaTypes.map(v => (
                <option key={v.id} value={v.id}>
                  {v.form} — {v.name} (${v.fee.toLocaleString()}{v.childFee != null ? ` / $${v.childFee.toLocaleString()} under 14` : ''})
                </option>
              ))}
            </select>
          </div>

          {/* Number of Applicants */}
          <div className="card">
            <label className="block text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              {t('feeNumApplicants')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-text-light)' }}>{t('feeAdults')}</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdults(Math.max(0, adults - 1))}
                    className="rounded-lg border p-2 transition hover:bg-gray-50"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <Minus className="h-4 w-4" style={{ color: 'var(--color-text-light)' }} />
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={adults}
                    onChange={(e) => setAdults(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
                    className="w-16 text-center rounded-lg border px-2 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <button
                    onClick={() => setAdults(Math.min(20, adults + 1))}
                    className="rounded-lg border p-2 transition hover:bg-gray-50"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <Plus className="h-4 w-4" style={{ color: 'var(--color-primary-500)' }} />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-text-light)' }}>{t('feeChildren')}</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="rounded-lg border p-2 transition hover:bg-gray-50"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <Minus className="h-4 w-4" style={{ color: 'var(--color-text-light)' }} />
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={children}
                    onChange={(e) => setChildren(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
                    className="w-16 text-center rounded-lg border px-2 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <button
                    onClick={() => setChildren(Math.min(20, children + 1))}
                    className="rounded-lg border p-2 transition hover:bg-gray-50"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <Plus className="h-4 w-4" style={{ color: 'var(--color-primary-500)' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="card">
            <label className="block text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              {t('feeAdditionalFees')}
            </label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={premiumProcessing}
                  onChange={(e) => setPremiumProcessing(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-[var(--color-primary-500)]"
                />
                <div>
                  <span className="text-sm font-medium group-hover:text-[var(--color-primary-500)] transition-colors" style={{ color: 'var(--color-text)' }}>
                    {t('feePremiumProcessing')} — ${PREMIUM_PROCESSING_FEE.toLocaleString()}
                  </span>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-light)' }}>
                    {t('feePremiumProcessingDesc')}
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={biometrics}
                  onChange={(e) => setBiometrics(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-[var(--color-primary-500)]"
                />
                <div>
                  <span className="text-sm font-medium group-hover:text-[var(--color-primary-500)] transition-colors" style={{ color: 'var(--color-text)' }}>
                    {t('feeBiometrics')} — ${BIOMETRICS_FEE} {t('perPerson')}
                  </span>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-light)' }}>
                    {t('feeBiometricsDesc')}
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={medicalExam}
                  onChange={(e) => setMedicalExam(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-[var(--color-primary-500)]"
                />
                <div>
                  <span className="text-sm font-medium group-hover:text-[var(--color-primary-500)] transition-colors" style={{ color: 'var(--color-text)' }}>
                    {t('feeMedicalExam')} — ~${MEDICAL_EXAM_FEE} {t('perPerson')} ({t('estimate')})
                  </span>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-light)' }}>
                    {t('feeMedicalExamDesc')}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2">
          <div className="card sticky top-20">
            <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              {t('feeCostBreakdown')}
            </h2>

            {breakdown.length === 0 ? (
              <div className="text-center py-8">
                <Calculator className="h-10 w-10 mx-auto mb-3" style={{ color: 'var(--color-border)' }} />
                <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                  {t('feeSelectToSee')}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {breakdown.map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 text-sm" style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface)' : 'white' }}>
                      <span style={{ color: 'var(--color-text)' }}>{item.label}</span>
                      <span className="font-bold flex-shrink-0" style={{ color: 'var(--color-primary-600)' }}>
                        ${item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{t('feeEstimatedTotal')}</span>
                    <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-500)' }}>
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 mt-5 no-print">
              <button onClick={handleReset} className="btn-outline flex-1 text-sm">
                <RotateCcw className="h-4 w-4" /> {t('feeReset')}
              </button>
              <button onClick={() => window.print()} className="btn-primary flex-1 text-sm">
                <Printer className="h-4 w-4" /> {t('print')}
              </button>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 rounded-lg p-3 flex items-start gap-2" style={{ backgroundColor: 'var(--color-warning-50)' }}>
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent-700)' }} />
              <div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
                  {t('feeDisclaimer')}
                </p>
                <a
                  href="https://www.uscis.gov/fees"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold mt-1 no-underline hover:underline"
                  style={{ color: 'var(--color-primary-500)' }}
                >
                  {t('feeVerifyLink')} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Reference Table */}
      <div className="mt-8 card">
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          {t('feeReferenceTitle')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <th className="text-left px-4 py-2.5 font-semibold" style={{ color: 'var(--color-primary-700)' }}>{t('feeRefForm')}</th>
                <th className="text-left px-4 py-2.5 font-semibold" style={{ color: 'var(--color-primary-700)' }}>{t('feeRefApplication')}</th>
                <th className="text-right px-4 py-2.5 font-semibold" style={{ color: 'var(--color-primary-700)' }}>{t('feeRefFee')}</th>
              </tr>
            </thead>
            <tbody>
              {visaTypes.map((v, i) => (
                <tr key={v.id} className="border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: i % 2 === 0 ? 'white' : 'var(--color-surface)' }}>
                  <td className="px-4 py-2.5 font-mono font-semibold" style={{ color: 'var(--color-primary-500)' }}>{v.form}</td>
                  <td className="px-4 py-2.5" style={{ color: 'var(--color-text)' }}>{v.name}</td>
                  <td className="px-4 py-2.5 text-right font-bold" style={{ color: 'var(--color-text)' }}>
                    ${v.fee.toLocaleString()}{v.childFee != null ? ` / $${v.childFee.toLocaleString()}` : ''}
                  </td>
                </tr>
              ))}
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <td className="px-4 py-2.5 font-mono font-semibold" style={{ color: 'var(--color-primary-500)' }}>I-907</td>
                <td className="px-4 py-2.5" style={{ color: 'var(--color-text)' }}>{t('feePremiumProcessing')}</td>
                <td className="px-4 py-2.5 text-right font-bold" style={{ color: 'var(--color-text)' }}>${PREMIUM_PROCESSING_FEE.toLocaleString()}</td>
              </tr>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                <td className="px-4 py-2.5 font-mono font-semibold" style={{ color: 'var(--color-primary-500)' }}>—</td>
                <td className="px-4 py-2.5" style={{ color: 'var(--color-text)' }}>{t('feeRefBiometrics')}</td>
                <td className="px-4 py-2.5 text-right font-bold" style={{ color: 'var(--color-text)' }}>${BIOMETRICS_FEE}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
