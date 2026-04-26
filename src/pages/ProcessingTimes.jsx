import { useState, useMemo } from 'react';
import { Clock, ExternalLink, BarChart3, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { processingTimesData, lastUpdated } from '../data/processingTimes';
import DisclaimerBanner from '../components/shared/DisclaimerBanner';

const COLORS = ['#003087', '#B22234', '#F5A623', '#2E7D32', '#7e22ce'];

function parseMinMonths(timeStr) {
  const match = timeStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export default function ProcessingTimes() {
  const { t } = useLanguage();
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('all');

  const allCenters = useMemo(() => {
    const set = new Set();
    processingTimesData.forEach(f => f.centers.forEach(c => set.add(c.name)));
    return Array.from(set).sort();
  }, []);

  const filteredData = useMemo(() => {
    return processingTimesData.filter(f => {
      if (selectedForm && f.form !== selectedForm) return false;
      return true;
    }).map(f => ({
      ...f,
      centers: selectedCenter === 'all' ? f.centers : f.centers.filter(c => c.name === selectedCenter),
    })).filter(f => f.centers.length > 0);
  }, [selectedForm, selectedCenter]);

  const chartData = useMemo(() => {
    if (!selectedForm) return [];
    const form = processingTimesData.find(f => f.form === selectedForm);
    if (!form) return [];
    return form.centers.map(c => ({
      name: c.name.replace(' Service Center', '').replace(' Asylum Office', ''),
      months: parseMinMonths(c.receiptToDecision),
      fullTime: c.receiptToDecision,
    }));
  }, [selectedForm]);

  return (
    <div className="page-container max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="section-title">{t('processingTimes')}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--color-text-light)' }}>
          {t('processingTimesIntro')} {lastUpdated}
        </p>
        <a
          href="https://egov.uscis.gov/processing-times/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium mt-2 no-underline"
          style={{ color: 'var(--color-primary-500)' }}
        >
          {t('processingTimesCheckRealtime')} <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <DisclaimerBanner className="mb-6" />

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4" style={{ color: 'var(--color-primary-500)' }} />
          <h2 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{t('processingTimesFilters')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-light)' }}>{t('processingTimesFormType')}</label>
            <select
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <option value="">{t('processingTimesAllForms')}</option>
              {processingTimesData.map(f => (
                <option key={f.form} value={f.form}>{f.form} — {f.formName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-light)' }}>{t('processingTimesServiceCenter')}</label>
            <select
              value={selectedCenter}
              onChange={(e) => setSelectedCenter(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <option value="all">{t('processingTimesAllCenters')}</option>
              {allCenters.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      {selectedForm && chartData.length > 0 && (
        <div className="card mb-6">
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            <BarChart3 className="h-4 w-4" style={{ color: 'var(--color-primary-500)' }} />
            {selectedForm} — {t('processingTimesComparison')}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
              <XAxis type="number" tick={{ fontSize: 12 }} unit=" mo" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
              <Tooltip
                formatter={(value, name, props) => [props.payload.fullTime, t('processingTimesProcessingTime')]}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar dataKey="months" radius={[0, 4, 4, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      <div className="space-y-6">
        {filteredData.map(form => (
          <div key={form.form} className="card overflow-hidden p-0">
            <div className="px-4 py-3" style={{ backgroundColor: 'var(--color-primary-50)' }}>
              <h3 className="font-bold text-sm" style={{ color: 'var(--color-primary-700)' }}>
                <span className="font-mono">{form.form}</span> — {form.formName}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <th className="text-left px-4 py-2 font-semibold" style={{ color: 'var(--color-text)' }}>{t('processingTimesServiceCenter')}</th>
                    <th className="text-right px-4 py-2 font-semibold" style={{ color: 'var(--color-text)' }}>{t('processingTimesReceiptToDecision')}</th>
                  </tr>
                </thead>
                <tbody>
                  {form.centers.map((center, i) => {
                    const minM = parseMinMonths(center.receiptToDecision);
                    const speedColor = minM <= 6 ? 'var(--color-success-500)' : minM <= 12 ? 'var(--color-accent-600)' : 'var(--color-secondary-500)';
                    return (
                      <tr key={i} className="border-b last:border-b-0" style={{ borderColor: 'var(--color-border)' }}>
                        <td className="px-4 py-2.5" style={{ color: 'var(--color-text-light)' }}>{center.name}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className="inline-flex items-center gap-1 font-semibold" style={{ color: speedColor }}>
                            <Clock className="h-3 w-3" /> {center.receiptToDecision}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
