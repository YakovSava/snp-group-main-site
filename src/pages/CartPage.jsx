import { useState } from 'react';
import Icon from '../components/common/Icon';
import LocalizedLink from '../components/common/LocalizedLink';
import QuantityStepper from '../components/common/QuantityStepper';
import Seo from '../components/common/Seo';
import { useCart } from '../context/CartContext';
import { useI18n } from '../i18n/I18nContext';
import { pickLocalized } from '../i18n/translate';
import { formatPrice } from '../utils/format';

function CartPage() {
  const { t, lang } = useI18n();
  const {
    lines, count, total, setQuantity, remove,
  } = useCart();
  const [selected, setSelected] = useState([]);

  const areAllSelected = lines.length > 0 && selected.length === lines.length;

  const toggleAll = () => setSelected(areAllSelected ? [] : lines.map((line) => line.id));

  const toggleOne = (id) => setSelected((current) => (
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  ));

  const removeSelected = () => {
    remove(selected);
    setSelected([]);
  };

  return (
    <>
      <Seo title={t('meta.cart.title')} description={t('meta.cart.description')} path="/cart" noindex />
      <div className="container-page py-8">
        <h1 className="text-2xl">{t('cart.title')}</h1>

        {lines.length === 0 ? (
          <div className="card mt-6 p-10 text-center">
            <p className="text-lg font-bold">{t('cart.empty')}</p>
            <p className="mt-2 text-ink-500">{t('cart.emptyText')}</p>
            <LocalizedLink to="/catalog" className="btn btn--primary mt-6">
              {t('cart.toCatalog')}
            </LocalizedLink>
          </div>
        ) : (
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_300px]">
            <section className="card overflow-hidden" aria-label={t('cart.title')}>
              <div className="flex items-center justify-between gap-4 border-b border-ink-100 px-5 py-3 text-xs">
                <label htmlFor="cart-select-all" className="flex cursor-pointer items-center gap-3">
                  <input
                    id="cart-select-all"
                    type="checkbox"
                    checked={areAllSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 accent-brand-dark"
                  />
                  {t('cart.selectAll')}
                </label>
                <button
                  type="button"
                  disabled={!selected.length}
                  onClick={removeSelected}
                  className="flex items-center gap-1.5 font-medium text-red-600 disabled:cursor-not-allowed disabled:text-ink-300"
                >
                  {t('cart.removeSelected')}
                  <Icon name="trash" size={14} />
                </button>
              </div>

              <ul>
                {lines.map((line) => (
                  <li
                    key={line.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 border-b border-ink-100 px-5 py-4 last:border-0 md:grid-cols-[auto_1fr_90px_auto_110px_auto]"
                  >
                    <input
                      type="checkbox"
                      aria-label={t('cart.selectItem')}
                      checked={selected.includes(line.id)}
                      onChange={() => toggleOne(line.id)}
                      className="h-4 w-4 accent-brand-dark"
                    />
                    <div className="min-w-0 text-xs">
                      <p className="font-extrabold uppercase">{line.product.brand}</p>
                      <p className="mt-0.5">
                        <LocalizedLink to={`/product/${line.product.slug}`} className="hover:underline">
                          {pickLocalized(line.product.name, lang)}
                        </LocalizedLink>
                      </p>
                      <p className="mt-0.5 text-ink-500">
                        {t('common.partNumber')}
                        :
                        {' '}
                        {line.product.sku}
                      </p>
                    </div>
                    <p className="hidden text-xs text-ink-500 md:block">
                      {t('common.days', { n: line.product.deliveryDays })}
                    </p>
                    <div className="col-start-2 text-center md:col-start-auto">
                      <QuantityStepper
                        value={line.quantity}
                        onChange={(value) => setQuantity(line.id, value)}
                      />
                      <p className="mt-1 text-[11px] text-ink-500">
                        {t('cart.unitPrice', { price: formatPrice(line.product.price) })}
                      </p>
                    </div>
                    <p className="col-start-3 row-start-1 text-right text-sm font-semibold md:col-start-auto md:row-start-auto">
                      {formatPrice(line.product.price * line.quantity)}
                    </p>
                    <button
                      type="button"
                      aria-label={t('cart.remove')}
                      onClick={() => remove([line.id])}
                      className="col-start-3 justify-self-end text-ink-300 transition-colors hover:text-red-600 md:col-start-auto"
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="card overflow-hidden" aria-label={t('cart.summaryTitle')}>
              <h2 className="border-b border-ink-100 px-5 py-4 text-base">{t('cart.summaryTitle')}</h2>
              <dl className="space-y-3 border-b border-ink-100 px-5 py-4 text-sm">
                <div className="flex justify-between">
                  <dt>{t('cart.items')}</dt>
                  <dd>{count}</dd>
                </div>
              </dl>
              <div className="px-5 py-4">
                <p className="flex justify-between text-sm font-semibold">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(total)}</span>
                </p>
                <LocalizedLink to="/checkout" className="btn btn--primary btn--block mt-4">
                  {t('cart.checkout')}
                </LocalizedLink>
                <p className="mt-3 text-[11px] leading-snug text-ink-500">{t('cart.note')}</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
