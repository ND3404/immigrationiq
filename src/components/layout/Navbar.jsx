import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Scale, Menu, X, MessageSquare, Globe, ChevronDown, ExternalLink, Calculator, CalendarDays, Clock, FileCheck, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const mainLinks = [
  { to: '/', key: 'home' },
  { to: '/categories', key: 'categories' },
  { to: '/chat', key: 'chat' },
  { to: '/timeline', key: 'timeline' },
  { to: '/lawyers', key: 'lawyers' },
  { to: '/news', key: 'news' },
  { to: '/faq', key: 'faq' },
];

const toolsDropdownItems = [
  { to: '/fee-calculator', key: 'feeCalculator', icon: Calculator, desc: 'Estimate filing costs' },
  { to: '/processing-times', key: 'processingTimes', icon: Clock, desc: 'Check USCIS times' },
  { to: '/checklist', key: 'checklist', icon: FileCheck, desc: 'Document checklists' },
  { to: '/glossary', key: 'glossary', icon: BookOpen, desc: 'Immigration terms' },
  { href: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html', key: 'visaBulletin', icon: CalendarDays, desc: 'Monthly DOS bulletin', external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors whitespace-nowrap ${isActive ? 'text-[var(--color-secondary-500)] font-bold' : 'text-[var(--color-text)] hover:text-[var(--color-primary-500)]'}`;

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
            <Scale className="h-6 w-6" style={{ color: 'var(--color-primary-500)' }} />
            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-500)' }}>
              Immigration<span style={{ color: 'var(--color-secondary-500)' }}>IQ</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-0.5 flex-1 justify-center">
            {mainLinks.map(({ to, key }) => (
              <NavLink key={key} to={to} className={linkClass} end={to === '/'}>
                <span className="px-2.5 py-1">{t(key)}</span>
              </NavLink>
            ))}

            {/* Tools dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`text-sm font-medium transition-colors inline-flex items-center gap-1 px-2.5 py-1 whitespace-nowrap ${toolsOpen ? 'text-[var(--color-primary-500)]' : 'text-[var(--color-text)] hover:text-[var(--color-primary-500)]'}`}
              >
                {language === 'es' ? 'Herramientas' : 'Tools'}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border py-2 animate-fade-in" style={{ borderColor: 'var(--color-border)' }}>
                  {toolsDropdownItems.map(({ to, href, key, icon: Icon, desc, external }) => (
                    external ? (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setToolsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[var(--color-surface)] no-underline"
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-primary-400)' }} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--color-text)' }}>
                            {t(key)} <ExternalLink className="h-3 w-3" style={{ color: 'var(--color-text-light)' }} />
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>{desc}</p>
                        </div>
                      </a>
                    ) : (
                      <Link
                        key={key}
                        to={to}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[var(--color-surface)] no-underline"
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-primary-400)' }} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{t(key)}</p>
                          <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>{desc}</p>
                        </div>
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-gray-50"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5" />
              {language === 'en' ? 'ES' : 'EN'}
            </button>

            {/* Ask AI CTA — prominent with pulse */}
            <Link
              to="/chat"
              className="btn-secondary hidden sm:inline-flex text-sm px-4 py-2 no-underline animate-pulse-glow rounded-full"
            >
              <MessageSquare className="h-4 w-4" />
              {t('askAI')}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden rounded-md p-2 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t animate-slide-in-right" style={{ borderColor: 'var(--color-border)' }}>
          <div className="px-4 py-3 space-y-1">
            {mainLinks.map(({ to, key }) => (
              <NavLink
                key={key}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)]' : 'text-[var(--color-text)] hover:bg-gray-50'}`
                }
                end={to === '/'}
              >
                {t(key)}
              </NavLink>
            ))}

            {/* Mobile Tools section */}
            <button
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition text-[var(--color-text)] hover:bg-gray-50"
            >
              {language === 'es' ? 'Herramientas' : 'Tools'}
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileToolsOpen && (
              <div className="pl-4 space-y-1">
                {toolsDropdownItems.map(({ to, href, key, icon: Icon, external }) => (
                  external ? (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition text-[var(--color-text)] hover:bg-gray-50 no-underline"
                    >
                      <Icon className="h-4 w-4" style={{ color: 'var(--color-primary-400)' }} />
                      {t(key)} <ExternalLink className="h-3 w-3" style={{ color: 'var(--color-text-light)' }} />
                    </a>
                  ) : (
                    <NavLink
                      key={key}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)]' : 'text-[var(--color-text)] hover:bg-gray-50'}`
                      }
                    >
                      <Icon className="h-4 w-4" style={{ color: 'var(--color-primary-400)' }} />
                      {t(key)}
                    </NavLink>
                  )
                ))}
              </div>
            )}

            <Link to="/chat" onClick={() => setOpen(false)} className="btn-secondary w-full mt-2 no-underline text-center">
              <MessageSquare className="h-4 w-4" /> {t('askAI')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
