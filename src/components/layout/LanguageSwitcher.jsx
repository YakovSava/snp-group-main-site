import { Link, useLocation } from 'react-router-dom';
import { LANGUAGES, buildPath } from '../../i18n/paths';
import { useI18n } from '../../i18n/I18nContext';
import en from '../../i18n/locales/en';
import ru from '../../i18n/locales/ru';
import hy from '../../i18n/locales/hy';

const LANGUAGE_META = { en: en.lang, ru: ru.lang, hy: hy.lang };

function LanguageSwitcher() {
  const { lang, path, t } = useI18n();
  const { search } = useLocation();

  return (
    <ul className="flex items-center gap-1" aria-label={t('common.language')}>
      {LANGUAGES.map((code) => {
        const isActive = code === lang;
        return (
          <li key={code}>
            <Link
              to={`${buildPath(code, path)}${search}`}
              hrefLang={code}
              lang={code}
              title={LANGUAGE_META[code].name}
              aria-current={isActive ? 'true' : undefined}
              className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
                isActive ? 'bg-brand text-ink-900' : 'text-white hover:text-brand'
              }`}
            >
              {LANGUAGE_META[code].short}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default LanguageSwitcher;
