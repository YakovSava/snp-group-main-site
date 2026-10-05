import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import Icon from '../common/Icon';

function Hero() {
  const { t, toLocalized } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(`${toLocalized('/catalog')}${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ''}`);
  };

  return (
    <section className="hero">
      <img
        src="/images/hero-1600.webp"
        srcSet="/images/hero-800.webp 800w, /images/hero-1600.webp 1600w"
        sizes="100vw"
        width="1600"
        height="584"
        alt=""
        fetchpriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="hero__overlay" />
      <div className="container-page flex min-h-[260px] flex-col items-center justify-center gap-6 py-14 text-center md:min-h-[340px]">
        <h1 className="max-w-3xl text-2xl uppercase leading-tight md:text-4xl">{t('hero.title')}</h1>
        <form
          role="search"
          action={toLocalized('/catalog')}
          method="get"
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl overflow-hidden rounded-md bg-brand shadow-lift"
        >
          <label htmlFor="hero-search" className="sr-only">{t('hero.searchPlaceholder')}</label>
          <input
            id="hero-search"
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('hero.searchPlaceholder')}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm font-medium text-ink-900 placeholder:text-ink-900/70 focus:outline-none"
          />
          <button
            type="submit"
            aria-label={t('hero.searchLabel')}
            className="border-l border-ink-900/15 px-5 text-ink-900 transition-colors hover:bg-brand-dark"
          >
            <Icon name="search" size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Hero;
