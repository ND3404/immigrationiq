import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, MessageSquare, ExternalLink, AlertTriangle, CheckCircle, FileText, DollarSign, Clock, Printer, ChevronDown, ChevronUp, CalendarCheck, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryById, categories } from '../data/categories';
import StepTimeline from '../components/immigration/StepTimeline';
import ProcessingTimeBadge from '../components/immigration/ProcessingTimeBadge';
import DocumentChecklist from '../components/immigration/DocumentChecklist';
import DisclaimerBanner from '../components/shared/DisclaimerBanner';

const difficultyClass = { Easy: 'badge-easy', Moderate: 'badge-moderate', Complex: 'badge-complex' };

function SubcategoryCard({ sub }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: open ? 'var(--color-primary-300)' : 'var(--color-border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[var(--color-surface)]"
        style={{ backgroundColor: open ? 'var(--color-primary-50)' : 'white' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="rounded-lg p-2 flex-shrink-0" style={{ backgroundColor: open ? 'var(--color-primary-100)' : 'var(--color-surface)' }}>
            <Users className="h-4 w-4" style={{ color: 'var(--color-primary-500)' }} />
          </div>
          <span className="font-bold text-sm truncate" style={{ color: 'var(--color-text)' }}>{sub.name}</span>
        </div>
        {open ? <ChevronUp className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }} /> : <ChevronDown className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-text-light)' }} />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
          {/* Who Qualifies */}
          <div className="pt-4">
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--color-primary-700)' }}>
              <CheckCircle className="h-4 w-4" /> Who Qualifies
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-light)' }}>{sub.whoQualifies}</p>
          </div>

          {/* Processing Time */}
          <div>
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--color-primary-700)' }}>
              <Clock className="h-4 w-4" /> Processing Time
            </h4>
            <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>{sub.processingTime}</p>
          </div>

          {/* Step-by-Step Process */}
          <div>
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--color-primary-700)' }}>
              <FileText className="h-4 w-4" /> Step-by-Step Process
            </h4>
            <div className="space-y-2">
              {sub.steps.map((s, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-primary-500)' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <span style={{ color: 'var(--color-text)' }}>{s.step}</span>
                    <span className="ml-2 text-xs font-medium" style={{ color: 'var(--color-primary-400)' }}>({s.timeline})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--color-primary-700)' }}>
              <FileText className="h-4 w-4" /> Required Documents
            </h4>
            <ul className="space-y-1.5">
              {sub.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-light)' }}>
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-300)' }} />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Filing Fees */}
          <div>
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--color-primary-700)' }}>
              <DollarSign className="h-4 w-4" /> Filing Fees
            </h4>
            <div className="space-y-1.5">
              {sub.filingFees.map((fee, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm" style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface)' : 'white' }}>
                  <span style={{ color: 'var(--color-text)' }}>{fee.item}</span>
                  <span className="font-bold" style={{ color: 'var(--color-primary-600)' }}>{fee.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Dates */}
          <div className="rounded-lg p-4" style={{ backgroundColor: sub.priorityDates.toLowerCase().startsWith('no') ? 'var(--color-success-50)' : 'var(--color-warning-50)' }}>
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: sub.priorityDates.toLowerCase().startsWith('no') ? 'var(--color-success-500)' : 'var(--color-accent-700)' }}>
              <CalendarCheck className="h-4 w-4" /> Priority Dates
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-light)' }}>{sub.priorityDates}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoryDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const category = getCategoryById(slug);

  if (!category) {
    return (
      <div className="page-container text-center py-20">
        <h1 className="section-title">Category Not Found</h1>
        <p className="mt-4" style={{ color: 'var(--color-text-light)' }}>The category you're looking for doesn't exist.</p>
        <Link to="/categories" className="btn-primary mt-6 no-underline">Browse All Categories</Link>
      </div>
    );
  }

  const relatedCats = category.relatedVisas?.map(id => getCategoryById(id)).filter(Boolean) || [];

  return (
    <div className="page-container max-w-4xl">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm font-medium mb-6 transition-colors hover:underline" style={{ color: 'var(--color-primary-500)' }}>
        <ArrowLeft className="h-4 w-4" /> {t('back')}
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{category.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <ProcessingTimeBadge time={category.processingTime} size="lg" />
          <span className={`badge ${difficultyClass[category.difficulty]}`}>{category.difficulty}</span>
          <span className="badge" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-light)' }}>{category.type}</span>
        </div>
        <div className="mt-4 flex gap-2 no-print">
          <Link to={`/chat?q=Tell me about the ${category.name} process`} className="btn-secondary text-sm no-underline">
            <MessageSquare className="h-4 w-4" /> {t('askAI')}
          </Link>
          <button onClick={() => window.print()} className="btn-outline text-sm">
            <Printer className="h-4 w-4" /> {t('print')}
          </button>
        </div>
      </div>

      <DisclaimerBanner className="mb-8" />

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Overview */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('overview')}</h2>
          <div className="prose max-w-none text-sm leading-relaxed space-y-3" style={{ color: 'var(--color-text-light)' }}>
            {category.overview.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('eligibility')}</h2>
          <ul className="space-y-2">
            {category.eligibility.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-light)' }}>
                <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success-500)' }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Step-by-Step Process */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('process')}</h2>
          <StepTimeline steps={category.steps} />
        </section>

        {/* Documents */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('documents')}</h2>
          <DocumentChecklist documents={category.documents} visaType={category.id} />
        </section>

        {/* Forms */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('forms')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ backgroundColor: 'var(--color-primary-50)' }}>
                  <th className="text-left px-4 py-2 font-semibold" style={{ color: 'var(--color-primary-700)' }}>Form</th>
                  <th className="text-left px-4 py-2 font-semibold" style={{ color: 'var(--color-primary-700)' }}>Name</th>
                  <th className="text-right px-4 py-2 font-semibold" style={{ color: 'var(--color-primary-700)' }}>Fee</th>
                </tr>
              </thead>
              <tbody>
                {category.forms.map((form, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="px-4 py-2 font-mono font-semibold" style={{ color: 'var(--color-primary-500)' }}>{form.number}</td>
                    <td className="px-4 py-2" style={{ color: 'var(--color-text)' }}>{form.name}</td>
                    <td className="px-4 py-2 text-right font-semibold" style={{ color: 'var(--color-text)' }}>{form.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Costs */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('costs')}</h2>
          <div className="space-y-2">
            {category.costs.map((cost, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-4 py-2.5" style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface)' : 'white' }}>
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>{cost.item}</span>
                <span className="text-sm font-bold" style={{ color: 'var(--color-primary-600)' }}>{cost.amount}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('mistakes')}</h2>
          <div className="space-y-2">
            {category.commonMistakes.map((mistake, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-3" style={{ backgroundColor: 'var(--color-danger-50)' }}>
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-secondary-500)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>{mistake}</span>
              </div>
            ))}
          </div>
        </section>

        {/* After Approval */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('afterApproval')}</h2>
          <ul className="space-y-2">
            {category.afterApproval.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-light)' }}>
                <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Subcategories (e.g., Family-Based visa types) */}
        {category.subcategories?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              Visa Categories
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-light)' }}>
              Click each category below to see who qualifies, required documents, processing times, fees, step-by-step process, and priority date information.
            </p>
            <div className="space-y-3">
              {category.subcategories.map(sub => (
                <SubcategoryCard key={sub.id} sub={sub} />
              ))}
            </div>
          </section>
        )}

        {/* Related Visas */}
        {relatedCats.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('relatedVisas')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedCats.map(rc => (
                <Link key={rc.id} to={`/category/${rc.id}`} className="card flex items-center gap-3 no-underline p-4">
                  <div className="rounded-lg p-2" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                    <FileText className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{rc.shortName}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>{rc.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
