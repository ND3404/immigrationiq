import { Link } from 'react-router-dom';

const BRAND = {
  navy: '#1B2D4F',
  red: '#C9384B',
  redDark: '#A52C3C',
  gold: '#E5B547',
  goldDark: '#C99A2E',
};

const VARIANT_STYLES = {
  primary: {
    backgroundColor: BRAND.red,
    color: '#FFFFFF',
    border: `2px solid ${BRAND.red}`,
  },
  secondary: {
    backgroundColor: 'transparent',
    color: BRAND.navy,
    border: `2px solid ${BRAND.navy}`,
  },
  gold: {
    backgroundColor: BRAND.gold,
    color: BRAND.navy,
    border: `2px solid ${BRAND.gold}`,
  },
};

const BASE_CLASS =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold text-base ' +
  'transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.99] ' +
  'shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2';

const BASE_STYLE = {
  paddingTop: '16px',
  paddingBottom: '16px',
  paddingLeft: '32px',
  paddingRight: '32px',
  minHeight: '52px',
  fontFamily: 'var(--font-body)',
  lineHeight: 1.1,
};

export default function CTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
  fullWidth = false,
  ariaLabel,
  ...rest
}) {
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  const style = { ...BASE_STYLE, ...variantStyle, width: fullWidth ? '100%' : undefined };
  const classes = `${BASE_CLASS} ${className}`.trim();

  if (href) {
    const isInternal = href.startsWith('/') && !href.startsWith('//');
    if (isInternal) {
      return (
        <Link to={href} className={`${classes} no-underline`} style={style} aria-label={ariaLabel} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={`${classes} no-underline`}
        style={style}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={style} aria-label={ariaLabel} {...rest}>
      {children}
    </button>
  );
}
