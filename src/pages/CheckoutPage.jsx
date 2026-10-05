import { useState } from 'react';
import FormStatus from '../components/common/FormStatus';
import LocalizedLink from '../components/common/LocalizedLink';
import Seo from '../components/common/Seo';
import TextField from '../components/common/TextField';
import { useCart } from '../context/CartContext';
import DELIVERY_METHODS, { getDeliveryMethod } from '../data/delivery';
import useFormValues from '../hooks/useFormValues';
import useSubmit from '../hooks/useSubmit';
import { useI18n } from '../i18n/I18nContext';
import { formatPrice } from '../utils/format';

const INITIAL_VALUES = {
  customerType: 'individual',
  fullName: '',
  phone: '',
  email: '',
  company: '',
  tin: '',
  delivery: 'courier',
  city: '',
  street: '',
  comment: '',
};

function CheckoutPage() {
  const { t, lang } = useI18n();
  const {
    lines, count, total, clear,
  } = useCart();
  const { values, handleChange } = useFormValues(INITIAL_VALUES);
  const { status, submit } = useSubmit('/orders');
  const [isPlaced, setIsPlaced] = useState(false);

  const method = getDeliveryMethod(values.delivery);
  const isLegal = values.customerType === 'legal';
  const deliveryPrice = method.price;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isSent = await submit({
      ...values,
      lang,
      items: lines.map((line) => ({ id: line.id, sku: line.product.sku, quantity: line.quantity })),
      total: total + deliveryPrice,
    });
    if (isSent) {
      clear();
      setIsPlaced(true);
    }
  };

  const seo = (
    <Seo title={t('meta.checkout.title')} description={t('meta.checkout.description')} path="/checkout" noindex />
  );

  if (isPlaced) {
    return (
      <>
        {seo}
        <div className="container-page py-16 text-center">
          <p role="status" className="card mx-auto max-w-lg p-10 text-lg font-bold">
            {t('checkout.success')}
          </p>
          <LocalizedLink to="/catalog" className="btn btn--primary mt-6">{t('cart.toCatalog')}</LocalizedLink>
        </div>
      </>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        {seo}
        <div className="container-page py-16 text-center">
          <h1 className="text-2xl">{t('checkout.title')}</h1>
          <p className="mt-3 text-ink-500">{t('checkout.emptyCart')}</p>
          <LocalizedLink to="/catalog" className="btn btn--primary mt-6">{t('cart.toCatalog')}</LocalizedLink>
        </div>
      </>
    );
  }

  return (
    <>
      {seo}
      <div className="container-page py-8">
        <h1 className="text-2xl">{t('checkout.title')}</h1>
        <form onSubmit={handleSubmit} className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="segmented" role="radiogroup" aria-label={t('checkout.title')}>
              {['individual', 'legal'].map((type) => (
                <label key={type} className="segmented__option">
                  <input
                    type="radio"
                    name="customerType"
                    value={type}
                    checked={values.customerType === type}
                    onChange={handleChange}
                  />
                  {t(`checkout.${type}`)}
                </label>
              ))}
            </div>

            <fieldset className="card space-y-4 p-6">
              <legend className="float-left mb-4 text-lg font-bold">{t('checkout.recipient')}</legend>
              <div className="clear-both grid gap-4 sm:grid-cols-2">
                {isLegal ? (
                  <>
                    <TextField label={t('checkout.company')} name="company" value={values.company} onChange={handleChange} autoComplete="organization" required />
                    <TextField label={t('checkout.tin')} name="tin" value={values.tin} onChange={handleChange} inputMode="numeric" required />
                  </>
                ) : null}
                <TextField label={isLegal ? t('checkout.contactPerson') : t('checkout.fullName')} name="fullName" value={values.fullName} onChange={handleChange} autoComplete="name" required />
                <TextField label={t('checkout.phone')} name="phone" type="tel" value={values.phone} onChange={handleChange} autoComplete="tel" inputMode="tel" required />
                <TextField label={t('checkout.email')} name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" required />
              </div>
            </fieldset>

            <fieldset className="card p-6">
              <legend className="float-left mb-4 text-lg font-bold">{t('checkout.deliveryMethod')}</legend>
              <div className="clear-both grid gap-3 md:grid-cols-3">
                {DELIVERY_METHODS.map((item) => (
                  <label key={item.id} className="radio-card">
                    <input
                      type="radio"
                      name="delivery"
                      value={item.id}
                      checked={values.delivery === item.id}
                      onChange={handleChange}
                    />
                    <span className="text-sm">
                      <span className="block font-semibold">{t(`checkout.methods.${item.id}.title`)}</span>
                      <span className="block text-xs text-ink-500">
                        {t(`checkout.methods.${item.id}.text`, { price: formatPrice(item.price) })}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {method.needsAddress ? (
              <fieldset className="card p-6">
                <legend className="float-left mb-4 text-lg font-bold">{t('checkout.address')}</legend>
                <div className="clear-both grid gap-4 sm:grid-cols-2">
                  <TextField label={t('checkout.city')} name="city" value={values.city} onChange={handleChange} autoComplete="address-level2" required />
                  <TextField label={t('checkout.street')} name="street" value={values.street} onChange={handleChange} autoComplete="street-address" required />
                </div>
              </fieldset>
            ) : null}

            <div className="card p-6">
              <TextField label={t('checkout.comment')} name="comment" value={values.comment} onChange={handleChange} multiline />
            </div>
          </div>

          <aside className="card overflow-hidden lg:sticky lg:top-24" aria-label={t('cart.summaryTitle')}>
            <h2 className="border-b border-ink-100 px-5 py-4 text-base">{t('cart.summaryTitle')}</h2>
            <dl className="space-y-3 border-b border-ink-100 px-5 py-4 text-sm">
              <div className="flex justify-between">
                <dt>{t('cart.items')}</dt>
                <dd>{count}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{t('checkout.delivery')}</dt>
                <dd>{deliveryPrice ? formatPrice(deliveryPrice) : t('common.free')}</dd>
              </div>
            </dl>
            <div className="px-5 py-4">
              <p className="flex justify-between text-sm font-semibold">
                <span>{t('cart.total')}</span>
                <span className="text-lg">{formatPrice(total + deliveryPrice)}</span>
              </p>
              <button type="submit" disabled={status === 'sending'} className="btn btn--primary btn--block mt-4">
                {status === 'sending' ? t('common.sending') : t('checkout.submit')}
              </button>
              <div className="mt-3">
                <FormStatus status={status} successText={t('checkout.success')} />
              </div>
              <p className="mt-3 text-[11px] leading-snug text-ink-500">{t('cart.note')}</p>
            </div>
          </aside>
        </form>
      </div>
    </>
  );
}

export default CheckoutPage;
