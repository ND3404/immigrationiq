import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const BRAND = {
  navy: '#1B2D4F',
  cream: '#F5F1E8',
  gold: '#E5B547',
  mutedNavy: '#5B6B85',
};

export default function ServiceTile({
  formCode,
  title,
  description,
  status = 'coming-soon',
  href,
}) {
  const { t } = useLanguage();
  const isAvailable = status === 'available';

  const containerStyle = {
    backgroundColor: BRAND.cream,
    opacity: isAvailable ? 1 : 0.7,
    border: `2px solid ${isAvailable ? BRAND.navy : 'rgba(27, 45, 79, 0.15)'}`,
    borderRadius: '16px',
    padding: '20px',
    color: BRAND.navy,
    fontFamily: 'var(--font-body)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minHeight: '160px',
    transition: 'transform 150ms ease-out, box-shadow 150ms ease-out',
  };

  const formCodeStyle = {
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.06em',
    color: BRAND.mutedNavy,
    textTransform: 'uppercase',
  };

  const titleStyle = {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    lineHeight: 1.25,
    fontWeight: 700,
    color: BRAND.navy,
    margin: 0,
  };

  const descStyle = {
    fontSize: '14px',
    lineHeight: 1.45,
    color: BRAND.mutedNavy,
    margin: 0,
    flexGrow: 1,
  };

  const comingSoonBadge = (
    <span
      style={{
        alignSelf: 'flex-start',
        backgroundColor: BRAND.gold,
        color: BRAND.navy,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: '999px',
      }}
    >
      {t('i130.tile.comingSoon')}
    </span>
  );

  const startLink = (
    <span
      style={{
        color: BRAND.navy,
        fontWeight: 700,
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {t('i130.tile.startCta')} <ArrowRight className="h-4 w-4" />
    </span>
  );

  const content = (
    <>
      <span style={formCodeStyle}>{formCode}</span>
      <h3 style={titleStyle}>{title}</h3>
      <p style={descStyle}>{description}</p>
      {isAvailable ? startLink : comingSoonBadge}
    </>
  );

  if (isAvailable && href) {
    return (
      <Link to={href} className="no-underline hover:-translate-y-0.5 hover:shadow-lg" style={containerStyle}>
        {content}
      </Link>
    );
  }

  return <div style={containerStyle}>{content}</div>;
}
