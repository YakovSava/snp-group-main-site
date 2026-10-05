import { useI18n } from '../../i18n/I18nContext';
import SectionTitle from '../common/SectionTitle';

function News() {
  const { t } = useI18n();
  return (
    <section className="card card--bordered p-5 md:p-6" aria-labelledby="news-title">
      <div id="news-title">
        <SectionTitle>{t('news.title')}</SectionTitle>
      </div>
      <ul className="mt-5 space-y-4">
        {t('news.items').map((item) => (
          <li key={item} className="border-b border-ink-100 pb-4 text-sm last:border-0 last:pb-0">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default News;
