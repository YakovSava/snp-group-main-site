import PropTypes from 'prop-types';
import { useI18n } from '../../i18n/I18nContext';
import { pickLocalized } from '../../i18n/translate';
import { formatPrice } from '../../utils/format';
import LocalizedLink from '../common/LocalizedLink';
import AddToCartButton from './AddToCartButton';

function ProductTile({ product }) {
  const { t, lang } = useI18n();
  return (
    <article className="product-tile">
      <p className="product-tile__sku">
        {t('common.partNumber')}
        :
        {' '}
        {product.sku}
      </p>
      <h3 className="product-tile__name !font-medium !tracking-normal">
        <LocalizedLink to={`/product/${product.slug}`} className="hover:underline">
          {pickLocalized(product.name, lang)}
        </LocalizedLink>
      </h3>
      <div className="mt-auto flex items-end justify-between gap-2 pt-4">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="product-tile__price">{formatPrice(product.price)}</span>
          <s className="product-tile__old-price">{formatPrice(product.oldPrice)}</s>
        </p>
        <AddToCartButton productId={product.id} />
      </div>
    </article>
  );
}

ProductTile.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number.isRequired,
    name: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default ProductTile;
