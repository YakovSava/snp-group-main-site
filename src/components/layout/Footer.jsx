import { useI18n } from '../../i18n/I18nContext';
import LocalizedLink from '../common/LocalizedLink';
import SubscribeForm from './SubscribeForm';

const COLUMNS = [
  {
    titleKey: 'footer.company',
    links: [
      { key: 'about', to: '/about' },
      { key: 'requisites', to: '/about#requisites' },
      { key: 'suppliers', to: '/about#suppliers' },
      { key: 'contacts', to: '/contacts' },
    ],
  },
  {
    titleKey: 'footer.clients',
    links: [
      { key: 'account', to: '/login' },
      { key: 'orderStatus', to: '/login' },
      { key: 'forgot', to: '/login' },
      { key: 'catalog', to: '/catalog' },
    ],
  },
  {
    titleKey: 'footer.help',
    links: [
      { key: 'faq', to: '/faq' },
      { key: 'payment', to: '/payment' },
      { key: 'delivery', to: '/delivery' },
      { key: 'returns', to: '/faq#returns' },
    ],
  },
];

const PAYMENT_SYSTEMS = ['VISA', 'Mastercard', 'Arca'];

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_1.4fr_1fr]">
        {COLUMNS.map((column) => (
          <nav key={column.titleKey} aria-label={t(column.titleKey)}>
            <p className="site-footer__heading">{t(column.titleKey)}</p>
            <ul className="space-y-2 text-[13px]">
              {column.links.map((link) => (
                <li key={link.key}>
                  <LocalizedLink to={link.to}>{t(`footer.links.${link.key}`)}</LocalizedLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <p className="site-footer__heading">{t('footer.subscribe.title')}</p>
          <p className="text-[13px] text-ink-300">{t('footer.subscribe.text')}</p>
          <SubscribeForm />
        </div>

        <p className="flex items-start gap-2 text-[13px] text-ink-300">
          <span className="status-dot mt-1 shrink-0" aria-hidden="true" />
          {t('footer.status')}
        </p>
      </div>

      <div className="border-t border-brand/60">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-ink-300 md:flex-row">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-3">
            <span>{t('footer.payments')}</span>
            <ul className="flex gap-2">
              {PAYMENT_SYSTEMS.map((system) => (
                <li
                  key={system}
                  className="rounded bg-ink-700 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white"
                >
                  {system}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4">
            <LocalizedLink to="/offer">{t('footer.offer')}</LocalizedLink>
            <LocalizedLink to="/privacy">{t('footer.privacy')}</LocalizedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
