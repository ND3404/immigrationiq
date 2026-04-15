import { Calendar, Tag, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryColors = {
  'USCIS Policy': 'var(--color-primary-500)',
  'Visa Bulletins': 'var(--color-success-500)',
  'Executive Orders': 'var(--color-secondary-500)',
  'Court Decisions': 'var(--color-accent-600)',
  'Fee Changes': 'var(--color-accent-800)',
};

export default function NewsCard({ item, showExplain = true }) {
  const color = categoryColors[item.category] || 'var(--color-primary-500)';

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge" style={{ backgroundColor: `${color}15`, color }}>{item.category}</span>
        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-light)' }}>
          <Calendar className="h-3 w-3" /> {item.date}
        </span>
      </div>
      <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        {item.title}
      </h3>
      <p className="text-sm mb-3" style={{ color: 'var(--color-text-light)' }}>{item.summary}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--color-text-light)' }}>{item.source}</span>
        {showExplain && (
          <Link
            to={`/chat?q=Explain this immigration news in simple terms: ${encodeURIComponent(item.title)}`}
            className="inline-flex items-center gap-1 text-xs font-semibold no-underline transition-colors hover:underline"
            style={{ color: 'var(--color-primary-500)' }}
          >
            <MessageSquare className="h-3 w-3" /> Explain
          </Link>
        )}
      </div>
    </div>
  );
}
