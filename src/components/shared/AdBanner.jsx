// AdSense placeholder — once approved, replace the inner <div> with the Google AdSense
// <ins class="adsbygoogle" ...> tag using your real client and slot IDs.
// Replace with Google AdSense script: ca-pub-XXXXXXX

import { useLanguage } from '../../context/LanguageContext';

const SIZE_STYLES = {
  leaderboard: { maxWidth: '728px', height: '90px' },
  rectangle: { maxWidth: '300px', height: '250px' },
};

export default function AdBanner({ size = 'leaderboard', className = '' }) {
  const { t } = useLanguage();
  const dims = SIZE_STYLES[size] ?? SIZE_STYLES.leaderboard;

  return (
    <div className={`mx-auto w-full flex justify-center my-4 px-4 ${className}`} aria-hidden="false">
      <div
        role="complementary"
        aria-label={t('adLabel')}
        className="w-full flex items-center justify-center rounded-md border border-dashed text-[11px] uppercase tracking-widest font-semibold"
        style={{
          maxWidth: dims.maxWidth,
          height: dims.height,
          backgroundColor: '#f5f5f5',
          borderColor: '#d4d4d4',
          color: '#9ca3af',
        }}
      >
        {t('adLabel')}
      </div>
    </div>
  );
}
