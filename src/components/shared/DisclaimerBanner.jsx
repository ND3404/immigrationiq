import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function DisclaimerBanner({ className = '' }) {
  const { t } = useLanguage();
  return (
    <div className={`rounded-lg p-3 flex items-start gap-3 ${className}`} style={{ backgroundColor: 'var(--color-accent-50)', border: '1px solid var(--color-accent-300)' }}>
      <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent-600)' }} />
      <p className="text-sm" style={{ color: 'var(--color-accent-800)' }}>{t('disclaimer')}</p>
    </div>
  );
}
