import {
  createContext, useCallback, useContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import en from './locales/en';
import ru from './locales/ru';
import hy from './locales/hy';
import { buildPath } from './paths';
import { translate } from './translate';

const DICTIONARIES = { en, ru, hy };

const I18nContext = createContext(null);

export function I18nProvider({ lang, path, children }) {
  const dictionary = DICTIONARIES[lang];
  const t = useCallback((key, vars) => translate(dictionary, key, vars), [dictionary]);
  const toLocalized = useCallback((target) => buildPath(lang, target), [lang]);
  const value = useMemo(
    () => ({
      lang, path, t, toLocalized,
    }),
    [lang, path, t, toLocalized],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

I18nProvider.propTypes = {
  lang: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return context;
}
