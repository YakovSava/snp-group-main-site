import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useI18n } from '../../i18n/I18nContext';
import Icon from '../common/Icon';
import LocalizedLink from '../common/LocalizedLink';
import Logo from '../common/Logo';

const NAV_ITEMS = [
  { to: '/catalog', key: 'catalog' },
  { to: '/about', key: 'about' },
  { to: '/payment', key: 'payment' },
  { to: '/delivery', key: 'delivery' },
  { to: '/contacts', key: 'contacts' },
];

function Header() {
  const { t, path } = useI18n();
  const { count } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur">
      <div className="container-page flex items-center gap-4 py-3">
        <LocalizedLink to="/" ariaLabel="SNP" className="shrink-0 text-ink">
          <Logo className="h-10 w-auto md:h-11" />
        </LocalizedLink>

        <nav
          aria-label={t('common.mainNavigation')}
          className={`${isOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-1 border-b border-ink-100 bg-white p-4 shadow-card md:static md:ml-4 md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {NAV_ITEMS.map((item) => (
            <LocalizedLink
              key={item.to}
              to={item.to}
              className="nav-link"
              ariaCurrent={path === item.to ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </LocalizedLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LocalizedLink to="/cart" className="btn btn--primary btn--small">
            <Icon name="cart" size={16} />
            <span className="hidden sm:inline">{t('common.cart')}</span>
            <span
              className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-900 px-1 text-[11px] text-white"
              aria-label={`${t('common.cart')}: ${count}`}
            >
              {count}
            </span>
          </LocalizedLink>
          <button
            type="button"
            className="icon-button md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? t('common.closeMenu') : t('common.menu')}
            onClick={() => setIsOpen((current) => !current)}
          >
            <Icon name={isOpen ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
