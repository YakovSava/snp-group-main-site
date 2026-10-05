import { useState } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import Icon from '../common/Icon';

const SLIDE_IMAGES = ['slide-tire', 'slide-yellow', 'slide-tire'];

function PromoSlider() {
  const { t } = useI18n();
  const slides = t('slides');
  const [index, setIndex] = useState(0);

  const goTo = (target) => setIndex((target + slides.length) % slides.length);

  return (
    <section className="promo-slider" aria-roledescription="carousel" aria-label={t('slides.0.title')}>
      <div className="promo-slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.title}
            className="promo-slider__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} / ${slides.length}`}
            aria-hidden={slideIndex !== index}
          >
            <img
              src={`/images/${SLIDE_IMAGES[slideIndex]}-1200.webp`}
              srcSet={`/images/${SLIDE_IMAGES[slideIndex]}-600.webp 600w, /images/${SLIDE_IMAGES[slideIndex]}-1200.webp 1200w`}
              sizes="(min-width: 1200px) 1200px, 100vw"
              alt=""
              loading="lazy"
              decoding="async"
              className="promo-slider__image"
            />
            <div className="promo-slider__shade" />
            <div className="px-10 py-10 md:px-16">
              <p className="max-w-md text-2xl font-medium leading-snug md:text-3xl">
                {slide.title}
                <br />
                <span className="promo-slider__accent">{slide.accent}</span>
              </p>
              <p className="mt-4 text-xs text-white/85 md:text-sm">{slide.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="promo-slider__arrow promo-slider__arrow--prev"
        aria-label={t('common.previous')}
        onClick={() => goTo(index - 1)}
      >
        <Icon name="chevronLeft" size={16} />
      </button>
      <button
        type="button"
        className="promo-slider__arrow promo-slider__arrow--next"
        aria-label={t('common.next')}
        onClick={() => goTo(index + 1)}
      >
        <Icon name="chevronRight" size={16} />
      </button>
      <div className="promo-slider__dots">
        {slides.map((slide, dotIndex) => (
          <button
            key={slide.title}
            type="button"
            className="promo-slider__dot"
            aria-label={`${dotIndex + 1} / ${slides.length}`}
            aria-current={dotIndex === index}
            onClick={() => goTo(dotIndex)}
          />
        ))}
      </div>
    </section>
  );
}

export default PromoSlider;
