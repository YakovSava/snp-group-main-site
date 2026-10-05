import PRODUCTS, { CATEGORIES } from '../data/products';
import { LANGUAGES, DEFAULT_LANGUAGE, buildPath } from '../i18n/paths';
import { absoluteUrl } from './site';

export const INFO_PAGES = ['about', 'payment', 'delivery', 'contacts', 'faq', 'privacy', 'offer'];

export const PRIVATE_PAGES = ['login', 'register', 'cart', 'checkout'];

export function getIndexablePaths() {
  return [
    '/',
    '/catalog',
    ...INFO_PAGES.map((page) => `/${page}`),
    ...CATEGORIES.map((category) => `/catalog/${category}`),
    ...PRODUCTS.map((product) => `/product/${product.slug}`),
  ];
}

export function getPrerenderUrls() {
  const paths = [...getIndexablePaths(), ...PRIVATE_PAGES.map((page) => `/${page}`)];
  return LANGUAGES.flatMap((lang) => paths.map((path) => buildPath(lang, path)));
}

export function getSitemapEntries() {
  return getIndexablePaths().flatMap((path) => LANGUAGES.map((lang) => ({
    url: absoluteUrl(buildPath(lang, path)),
    alternates: [
      ...LANGUAGES.map((code) => ({ lang: code, url: absoluteUrl(buildPath(code, path)) })),
      { lang: 'x-default', url: absoluteUrl(buildPath(DEFAULT_LANGUAGE, path)) },
    ],
  })));
}

export function getPrivatePaths() {
  return LANGUAGES.flatMap((lang) => PRIVATE_PAGES.map((page) => buildPath(lang, `/${page}`)));
}
