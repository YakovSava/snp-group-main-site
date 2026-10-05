import {
  COMPANY, CURRENCY, SITE_NAME, absoluteUrl,
} from '../config/site';
import { buildPath } from '../i18n/paths';
import { pickLocalized } from '../i18n/translate';

export function organizationLd(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: COMPANY.legalName,
    alternateName: SITE_NAME,
    url: absoluteUrl(buildPath(lang, '/')),
    logo: absoluteUrl(COMPANY.logo),
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vanadzor',
      addressCountry: COMPANY.countryCode,
    },
  };
}

export function websiteLd(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl(buildPath(lang, '/')),
    inLanguage: lang,
    publisher: { '@id': absoluteUrl('/#organization') },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl(buildPath(lang, '/catalog'))}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbLd(items, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(buildPath(lang, item.path)),
    })),
  };
}

export function productLd(product, lang) {
  const name = pickLocalized(product.name, lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: pickLocalized(product.description, lang),
    sku: product.sku,
    mpn: product.sku,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(buildPath(lang, `/product/${product.slug}`)),
      priceCurrency: CURRENCY.code,
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': absoluteUrl('/#organization') },
    },
  };
}

export function faqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
