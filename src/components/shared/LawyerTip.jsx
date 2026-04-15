import { Lightbulb, AlertTriangle } from 'lucide-react';

export default function LawyerTip({ title, children, variant = 'tip' }) {
  const isWarning = variant === 'warning';
  const Icon = isWarning ? AlertTriangle : Lightbulb;
  const bgColor = isWarning ? 'var(--color-danger-50)' : 'var(--color-primary-50)';
  const borderColor = isWarning ? 'var(--color-secondary-500)' : 'var(--color-primary-300)';
  const iconColor = isWarning ? 'var(--color-secondary-500)' : 'var(--color-primary-500)';

  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: bgColor, borderLeft: `4px solid ${borderColor}` }}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: iconColor }} />
        <div>
          {title && <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--color-text)' }}>{title}</h4>}
          <div className="text-sm" style={{ color: 'var(--color-text-light)' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
