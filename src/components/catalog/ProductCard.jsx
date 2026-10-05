import PropTypes from 'prop-types';
import { useI18n } from '../../i18n/I18nContext';
import { pickLocalized } from '../../i18n/translate';
import { formatPrice } from '../../utils/format';
import Icon, { CATEGORY_ICONS } from '../common/Icon';
import LocalizedLink from '../common/LocalizedLink';
import AddToCartButton from './AddToCartButton';

function ProductCard({ product }) {
  const { t, lang } = useI18n();
  return (
    <article className="card flex h-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lift">
      <LocalizedLink
        to={`/product/${product.slug}`}
        ariaLabel={pickLocalized(product.name, lang)}
        className="flex h-36 items-center justify-center bg-gradient-to-br from-brand-light to-brand/70 text-ink-900"
      >
        <Icon name={CATEGORY_ICONS[product.category]} size={56} />
      </LocalizedLink>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-ink-500">
          {product.brand}
          {' · '}
          {t('common.partNumber')}
          {' '}
          {product.sku}
        </p>
        <h2 className="mt-1 text-sm font-semibold leading-snug !tracking-normal">
          <LocalizedLink to={`/product/${product.slug}`} className="hover:underline">
            {pickLocalized(product.name, lang)}
          </LocalizedLink>
        </h2>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
            <s className="text-xs text-ink-500">{formatPrice(product.oldPrice)}</s>
          </p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number.isRequired,
    name: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default ProductCard;
