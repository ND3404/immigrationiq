import { Clock } from 'lucide-react';

function getSpeedColor(timeStr) {
  const match = timeStr.match(/(\d+)/);
  if (!match) return 'var(--color-text-light)';
  const months = parseInt(match[1]);
  if (months <= 6) return 'var(--color-success-500)';
  if (months <= 12) return 'var(--color-accent-600)';
  return 'var(--color-secondary-500)';
}

export default function ProcessingTimeBadge({ time, size = 'sm' }) {
  const color = getSpeedColor(time);
  const sizeClass = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClass}`} style={{ backgroundColor: `${color}15`, color }}>
      <Clock className={size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} />
      {time}
    </span>
  );
}
