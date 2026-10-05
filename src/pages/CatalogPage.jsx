import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Icon from '../components/common/Icon';
import LocalizedLink from '../components/common/LocalizedLink';
import Seo from '../components/common/Seo';
import ProductCard from '../components/catalog/ProductCard';
import PRODUCTS, { CATEGORIES } from '../data/products';
import { useI18n } from '../i18n/I18nContext';
import { LANGUAGES, buildPath } from '../i18n/paths';
import { pickLocalized } from '../i18n/translate';
import { breadcrumbLd } from '../utils/jsonLd';
import NotFoundPage from './NotFoundPage';

function matchesQuery(product, query) {
  const needle = query.toLowerCase();
  const haystack = [
    product.sku,
    product.brand,
    ...LANGUAGES.map((code) => pickLocalized(product.name, code)),
  ].join(' ').toLowerCase();
  return haystack.includes(needle);
}

function CatalogPage() {
  const { t, lang } = useI18n();
  const { category } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const nextQuery = (new URLSearchParams(search).get('q') || '').trim();
    setQuery(nextQuery);
    setDraft(nextQuery);
  }, [search]);

  const products = useMemo(() => PRODUCTS.filter((product) => (
    (!category || product.category === category) && (!query || matchesQuery(product, query))
  )), [category, query]);

  if (category && !CATEGORIES.includes(category)) {
    return <NotFoundPage />;
  }

  const heading = category ? t(`categories.${category}`) : t('catalog.h1');
  const path = category ? `/catalog/${category}` : '/catalog';
  const crumbs = [
    { name: t('common.home'), path: '/' },
    { name: t('nav.catalog'), path: '/catalog' },
    ...(category ? [{ name: heading, path }] : []),
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = draft.trim();
    navigate(`${buildPath(lang, path)}${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ''}`);
  };

  return (
    <>
      <Seo
        title={category ? t('catalog.categoryTitle', { name: heading }) : t('meta.catalog.title')}
        description={category
          ? t('catalog.categoryDescription', { name: heading })
          : t('meta.catalog.description')}
        path={path}
        jsonLd={[breadcrumbLd(crumbs, lang)]}
      />
      <div className="container-page py-8">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-2xl md:text-3xl">{query ? t('catalog.searchResults', { q: query }) : heading}</h1>
        <p className="mt-2 text-ink-500">{t('catalog.intro')}</p>

        <form role="search" onSubmit={handleSubmit} className="mt-6 flex max-w-xl overflow-hidden rounded-md border border-brand bg-white">
          <label htmlFor="catalog-search" className="sr-only">{t('hero.searchPlaceholder')}</label>
          <input
            id="catalog-search"
            type="search"
            name="q"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t('hero.searchPlaceholder')}
            className="min-w-0 flex-1 px-4 py-3 text-sm focus:outline-none"
          />
          <button type="submit" aria-label={t('hero.searchLabel')} className="bg-brand px-5 hover:bg-brand-dark">
            <Icon name="search" size={18} />
          </button>
        </form>

        <ul className="mt-6 flex flex-wrap gap-2">
          {[null, ...CATEGORIES].map((item) => {
            const isActive = (item || undefined) === category;
            return (
              <li key={item || 'all'}>
                <LocalizedLink
                  to={item ? `/catalog/${item}` : '/catalog'}
                  ariaCurrent={isActive ? 'page' : undefined}
                  className={`inline-block rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'border-brand bg-brand text-ink-900'
                      : 'border-ink-100 bg-white hover:border-brand'
                  }`}
                >
                  {item ? t(`categories.${item}`) : t('categories.all')}
                </LocalizedLink>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-sm text-ink-500" aria-live="polite">{t('catalog.found', { n: products.length })}</p>

        {products.length ? (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="card mt-4 p-8 text-center text-ink-500">{t('catalog.empty')}</p>
        )}
      </div>
    </>
  );
}

export default CatalogPage;
