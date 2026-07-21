import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.immigrationiq.us';
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo-full.svg`;
const SITE_NAME = 'ImmigrationIQ';

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  jsonLd,
  // Optional social-preview overrides. Default to the SEO title/description,
  // but let a page give a cleaner headline for shared link cards (e.g. the
  // Visa Bulletin shares "U.S. Visa Bulletin — August 2026" while its <title>
  // stays keyword-rich for search).
  ogTitle,
  ogDescription,
}) {
  const url = `${SITE_URL}${path}`;
  const ogImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const socialTitle = ogTitle || title;
  const socialDescription = ogDescription || description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
