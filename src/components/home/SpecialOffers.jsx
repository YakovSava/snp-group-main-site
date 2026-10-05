import { useRef } from 'react';
import PRODUCTS, { SPECIAL_OFFER_IDS } from '../../data/products';
import { useI18n } from '../../i18n/I18nContext';
import Icon from '../common/Icon';
import ProductTile from '../catalog/ProductTile';

const SCROLL_STEP = 276;

function SpecialOffers() {
  const { t } = useI18n();
  const scrollerRef = useRef(null);
  const offers = PRODUCTS.filter((product) => SPECIAL_OFFER_IDS.includes(product.id));

  const scrollBy = (direction) => {
    scrollerRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: 'smooth' });
  };

  return (
    <section className="card card--bordered p-5 md:p-8" aria-labelledby="offers-title">
      <div className="flex justify-center">
        <h2 id="offers-title" className="section-title section-title--center !w-auto">
          {t('offers.title')}
        </h2>
      </div>
      <div className="relative mt-8">
        <ul ref={scrollerRef} className="scroller" aria-label={t('offers.ariaLabel')}>
          {offers.map((product) => (
            <li key={product.id}>
              <ProductTile product={product} />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="promo-slider__arrow promo-slider__arrow--next !-right-6 hidden md:inline-flex"
          aria-label={t('common.next')}
          onClick={() => scrollBy(1)}
        >
          <Icon name="chevronRight" size={16} />
        </button>
        <button
          type="button"
          className="promo-slider__arrow promo-slider__arrow--prev !-left-6 hidden md:inline-flex"
          aria-label={t('common.previous')}
          onClick={() => scrollBy(-1)}
        >
          <Icon name="chevronLeft" size={16} />
        </button>
      </div>
    </section>
  );
}

export default SpecialOffers;
