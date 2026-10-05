import { Helmet } from 'react-helmet-async';
import LocalizedLink from '../components/common/LocalizedLink';
import { useI18n } from '../i18n/I18nContext';

function NotFoundPage() {
  const { t, lang } = useI18n();
  return (
    <div className="container-page py-20 text-center">
      <Helmet>
        <html lang={lang} />
        <title>{t('meta.notFound.title')}</title>
        <meta name="description" content={t('meta.notFound.description')} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <p className="text-6xl font-extrabold text-brand-dark">404</p>
      <h1 className="mt-4 text-3xl">{t('pages.notFound.h1')}</h1>
      <p className="mt-3 text-ink-500">{t('pages.notFound.text')}</p>
      <LocalizedLink to="/" className="btn btn--primary mt-8">
        {t('pages.notFound.back')}
      </LocalizedLink>
    </div>
  );
}

export default NotFoundPage;
