import { CURRENCY } from '../config/site';

export function formatNumber(value) {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
}

export function formatPrice(value) {
  return `${formatNumber(value)}\u00A0${CURRENCY.symbol}`;
}
