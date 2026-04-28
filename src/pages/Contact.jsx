import { useState } from 'react';
import { Mail, Send, AlertTriangle, CheckCircle, Briefcase, Users, BookOpen, Megaphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvadbnp';
const CONTACT_EMAIL = 'contact@immigrationiq.us';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const subjectOptions = [
    { value: 'general', labelKey: 'contactSubjectGeneral' },
    { value: 'partnership', labelKey: 'contactSubjectPartnership' },
    { value: 'listing', labelKey: 'contactSubjectListing' },
    { value: 'bug', labelKey: 'contactSubjectBug' },
    { value: 'other', labelKey: 'contactSubjectOther' },
  ];

  const partnershipBullets = [
    { icon: Users, key: 'contactPartnershipBullet1' },
    { icon: BookOpen, key: 'contactPartnershipBullet2' },
    { icon: Megaphone, key: 'contactPartnershipBullet3' },
    { icon: Briefcase, key: 'contactPartnershipBullet4' },
  ];

  return (
    <div className="page-container max-w-5xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="section-title">{t('contactTitle')}</h1>
        <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
          {t('contactIntro')}
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold no-underline transition-colors hover:underline"
          style={{ color: 'var(--color-primary-500)' }}
        >
          <Mail className="h-4 w-4" />
          <span className="text-[var(--color-text-light)] font-normal">{t('contactEmailLabel')}:</span>
          <span>{CONTACT_EMAIL}</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="card">
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              {t('contactFormHeading')}
            </h2>

            {status === 'success' ? (
              <div className="rounded-lg p-4 flex items-start gap-3" style={{ backgroundColor: 'var(--color-success-50)', border: '1px solid var(--color-success-500)' }}>
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success-500)' }} />
                <p className="text-sm" style={{ color: 'var(--color-success-600)' }}>{t('contactSuccess')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    {t('contactFieldName')} <span style={{ color: 'var(--color-secondary-500)' }}>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('contactPlaceholderName')}
                    className="w-full rounded-lg border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
                    style={{ borderColor: 'var(--color-border)', minHeight: '44px' }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
                      {t('contactFieldEmail')} <span style={{ color: 'var(--color-secondary-500)' }}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('contactPlaceholderEmail')}
                      className="w-full rounded-lg border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
                      style={{ borderColor: 'var(--color-border)', minHeight: '44px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
                      {t('contactFieldPhone')}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t('contactPlaceholderPhone')}
                      className="w-full rounded-lg border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
                      style={{ borderColor: 'var(--color-border)', minHeight: '44px' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    {t('contactFieldSubject')} <span style={{ color: 'var(--color-secondary-500)' }}>*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
                    style={{ borderColor: 'var(--color-border)', minHeight: '44px', color: form.subject ? 'var(--color-text)' : 'var(--color-text-light)' }}
                  >
                    <option value="">{t('contactSelectSubject')}</option>
                    {subjectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    {t('contactFieldMessage')} <span style={{ color: 'var(--color-secondary-500)' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contactPlaceholderMessage')}
                    className="w-full rounded-lg border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] resize-y"
                    style={{ borderColor: 'var(--color-border)' }}
                  />
                </div>

                {status === 'error' && (
                  <div className="rounded-lg p-3 flex items-start gap-2" style={{ backgroundColor: 'var(--color-danger-50)', border: '1px solid var(--color-secondary-500)' }}>
                    <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-secondary-500)' }} />
                    <div className="text-sm" style={{ color: 'var(--color-secondary-600)' }}>
                      <p className="font-semibold">{t('contactError')}</p>
                      <p className="mt-1">
                        {t('contactErrorFallback')}{' '}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="font-semibold underline"
                          style={{ color: 'var(--color-secondary-600)' }}
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  {status === 'submitting' ? t('contactSubmitting') : t('contactSubmit')}
                </button>
              </form>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-4 rounded-lg p-3 flex items-start gap-3" style={{ backgroundColor: 'var(--color-warning-50)', border: '1px solid var(--color-accent-300)' }}>
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent-700)' }} />
            <p className="text-sm" style={{ color: 'var(--color-accent-800)' }}>{t('contactDisclaimer')}</p>
          </div>
        </div>

        {/* Sidebar — Lawyers & Businesses */}
        <aside className="lg:col-span-2">
          <div
            className="card h-full"
            style={{ background: 'linear-gradient(160deg, var(--color-primary-600) 0%, var(--color-primary-500) 100%)', borderColor: 'var(--color-primary-700)' }}
          >
            <div className="rounded-lg inline-flex p-2 mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('contactPartnershipTitle')}
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {t('contactPartnershipBody')}
            </p>
            <ul className="space-y-2.5 mb-5">
              {partnershipBullets.map(({ icon: Icon, key }) => (
                <li key={key} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.95)' }}>
                  <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent-300)' }} />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium pt-4 border-t" style={{ color: 'rgba(255,255,255,0.95)', borderColor: 'rgba(255,255,255,0.2)' }}>
              {t('contactPartnershipCta')}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
