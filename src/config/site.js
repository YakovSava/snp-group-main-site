export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://snp-group.am').replace(/\/$/, '');

export const SITE_NAME = 'SNP';

export const COMPANY = {
  legalName: 'SNP GROUP LLC',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+374 00 000 000',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'info@snp-group.am',
  countryCode: 'AM',
  logo: '/logo.png',
  ogImage: '/og-image.jpg',
};

export const CURRENCY = {
  code: 'AMD',
  symbol: '\u058F',
};

export function absoluteUrl(path) {
  return `${SITE_URL}${path}`;
}

export function phoneHref(phone) {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}
