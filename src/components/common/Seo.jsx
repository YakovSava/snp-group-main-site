import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { COMPANY, SITE_NAME, absoluteUrl } from '../../config/site';
import { useI18n } from '../../i18n/I18nContext';
import { DEFAULT_LANGUAGE, LANGUAGES, buildPath } from '../../i18n/paths';
import en from '../../i18n/locales/en';
import ru from '../../i18n/locales/ru';
import hy from '../../i18n/locales/hy';

const LOCALES = { en: en.lang.locale, ru: ru.lang.locale, hy: hy.lang.locale };

function Seo({
  title,
  description,
  path,
  noindex = false,
  type = 'website',
  image = COMPANY.ogImage,
  jsonLd = [],
}) {
  const { lang } = useI18n();
  const canonical = absoluteUrl(buildPath(lang, path));
  const imageUrl = absoluteUrl(image);
  const robots = noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1';

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      {LANGUAGES.map((code) => (
        <link
          key={code}
          rel="alternate"
          hreflang={code}
          href={absoluteUrl(buildPath(code, path))}
        />
      ))}
      <link
        rel="alternate"
        hreflang="x-default"
        href={absoluteUrl(buildPath(DEFAULT_LANGUAGE, path))}
      />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="631" />
      <meta property="og:locale" content={LOCALES[lang]} />
      {LANGUAGES.filter((code) => code !== lang).map((code) => (
        <meta key={code} property="og:locale:alternate" content={LOCALES[code]} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd.map((item) => (
        <script key={`${item['@type']}-${item.name || item.url || item['@id']}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  noindex: PropTypes.bool,
  type: PropTypes.string,
  image: PropTypes.string,
  jsonLd: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Seo;
