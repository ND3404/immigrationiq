import { Calendar, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const categoryColors = {
  'USCIS Policy': 'var(--color-primary-500)',
  'Visa Bulletins': 'var(--color-success-500)',
  'Executive Orders': 'var(--color-secondary-500)',
  'Court Decisions': 'var(--color-accent-600)',
  'Fee Changes': 'var(--color-accent-800)',
};

const categoryLabelKeys = {
  'USCIS Policy': 'newsCatUscis',
  'Visa Bulletins': 'newsCatVisaBulletins',
  'Executive Orders': 'newsCatExecutive',
  'Court Decisions': 'newsCatCourt',
  'Fee Changes': 'newsCatFee',
};

function pickLocalized(field, language) {
  if (field && typeof field === 'object') return field[language] || field.en || '';
  return field || '';
}

export default function NewsCard({ item, showExplain = true }) {
  const { t, language } = useLanguage();
  const color = categoryColors[item.category] || 'var(--color-primary-500)';
  const categoryLabel = categoryLabelKeys[item.category] ? t(categoryLabelKeys[item.category]) : item.category;
  const title = pickLocalized(item.title, language);
  const summary = pickLocalized(item.summary, language);
  const dateDisplay = language === 'es' && item.dateEs ? item.dateEs : item.date;

  return (
    <div className="card flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge" style={{ backgroundColor: `${color}15`, color }}>{categoryLabel}</span>
        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-light)' }}>
          <Calendar className="h-3 w-3" /> {dateDisplay}
        </span>
      </div>
      <h3
        className="font-bold text-base mb-2"
        style={{ fontFamily: 'var(--font-heading)', color: '#C75B45' }}
      >
        {title}
      </h3>
      <p className="text-sm mb-3 flex-1" style={{ color: 'var(--color-text-light)' }}>{summary}</p>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs" style={{ color: 'var(--color-text-light)' }}>{item.source}</span>
        <div className="flex items-center gap-3">
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold no-underline transition-colors hover:underline"
              style={{ color: '#C75B45' }}
            >
              {t('readMore')} <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {showExplain && (
            <Link
              to={`/chat?q=Explain this immigration news in simple terms: ${encodeURIComponent(title)}`}
              className="inline-flex items-center gap-1 text-xs font-semibold no-underline transition-colors hover:underline"
              style={{ color: 'var(--color-primary-500)' }}
            >
              <MessageSquare className="h-3 w-3" /> {t('explain')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
