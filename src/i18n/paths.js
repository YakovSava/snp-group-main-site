export const DEFAULT_LANGUAGE = 'en';

export const LANGUAGES = ['en', 'ru', 'hy'];

const PREFIXED_LANGUAGES = LANGUAGES.filter((code) => code !== DEFAULT_LANGUAGE);

export function buildPath(lang, path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (lang === DEFAULT_LANGUAGE) {
    return normalized;
  }
  return normalized === '/' ? `/${lang}` : `/${lang}${normalized}`;
}

export function parsePath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const [first, ...rest] = segments;
  const hasPrefix = PREFIXED_LANGUAGES.includes(first);
  const pathSegments = hasPrefix ? rest : segments;
  return {
    lang: hasPrefix ? first : DEFAULT_LANGUAGE,
    path: `/${pathSegments.join('/')}`,
  };
}
