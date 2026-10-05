import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../components/catalog/AddToCartButton';
import ProductTile from '../components/catalog/ProductTile';
import Breadcrumbs from '../components/common/Breadcrumbs';
import QuantityStepper from '../components/common/QuantityStepper';
import SectionTitle from '../components/common/SectionTitle';
import Seo from '../components/common/Seo';
import PRODUCTS, { getProductBySlug } from '../data/products';
import { useI18n } from '../i18n/I18nContext';
import { pickLocalized } from '../i18n/translate';
import { formatPrice } from '../utils/format';
import { breadcrumbLd, productLd } from '../utils/jsonLd';
import NotFoundPage from './NotFoundPage';

function ProductView({ product }) {
  const { t, lang } = useI18n();
  const [quantity, setQuantity] = useState(1);

  const name = pickLocalized(product.name, lang);
  const description = pickLocalized(product.description, lang);
  const categoryName = t(`categories.${product.category}`);
  const crumbs = [
    { name: t('common.home'), path: '/' },
    { name: t('nav.catalog'), path: '/catalog' },
    { name: categoryName, path: `/catalog/${product.category}` },
    { name, path: `/product/${product.slug}` },
  ];
  const sameCategory = PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const otherCategories = PRODUCTS.filter((item) => item.category !== product.category);
  const related = [...sameCategory, ...otherCategories].slice(0, 4);

  const specs = [
    [t('product.manufacturerNo'), product.sku],
    [t('product.manufacturer'), product.brand],
    [t('product.size'), product.sizeMm],
    [t('product.weight'), t('product.kg', { n: product.weightKg })],
    [t('product.group'), product.group],
    [t('product.delivery'), t('common.days', { n: product.deliveryDays })],
  ];

  return (
    <>
      <Seo
        title={t('product.titleSuffix', { name })}
        description={description}
        path={`/product/${product.slug}`}
        type="product"
        jsonLd={[productLd(product, lang), breadcrumbLd(crumbs, lang)]}
      />
      <div className="container-page py-8">
        <Breadcrumbs items={crumbs} />
        <h1 className="card px-5 py-4 text-lg uppercase md:text-xl">{name}</h1>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          <section className="card min-h-[240px] p-6" aria-labelledby="product-info">
            <h2 id="product-info" className="text-sm uppercase">{t('product.infoTitle')}</h2>
            <p className="mt-4 leading-relaxed text-ink-700">{description}</p>
          </section>

          <section className="card overflow-hidden" aria-label={t('product.price')}>
            <dl className="space-y-1.5 p-6 text-sm">
              {specs.map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="text-ink-500">
                    {label}
                    :
                  </dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t-2 border-brand/60 p-6">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-ink-700">
                  {t('product.price')}
                  :
                </span>
                <span className="text-2xl font-semibold">{formatPrice(product.price * quantity)}</span>
                <s className="text-xs text-ink-500">{formatPrice(product.oldPrice * quantity)}</s>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <QuantityStepper value={quantity} onChange={setQuantity} />
                <AddToCartButton productId={product.id} quantity={quantity} variant="full" />
              </div>
              <p className="mt-2 text-xs text-ink-500">
                {t('product.perPiece', { price: formatPrice(product.price) })}
              </p>
            </div>
          </section>
        </div>

        <section className="mt-12" aria-labelledby="related-title">
          <div id="related-title">
            <SectionTitle>{t('product.related')}</SectionTitle>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.id}>
                <ProductTile product={item} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

ProductView.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number.isRequired,
    deliveryDays: PropTypes.number.isRequired,
    weightKg: PropTypes.number.isRequired,
    sizeMm: PropTypes.string.isRequired,
    name: PropTypes.shape({}).isRequired,
    description: PropTypes.shape({}).isRequired,
  }).isRequired,
};

function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  if (!product) {
    return <NotFoundPage />;
  }
  return <ProductView key={product.id} product={product} />;
}

export default ProductPage;
