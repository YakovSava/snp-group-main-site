import { CATEGORIES } from '../../data/products';
import { useI18n } from '../../i18n/I18nContext';
import Icon, { CATEGORY_ICONS } from '../common/Icon';
import LocalizedLink from '../common/LocalizedLink';

const FEATURED_CATEGORIES = CATEGORIES.slice(0, 4);

function CategoryBanners() {
  const { t } = useI18n();
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {FEATURED_CATEGORIES.map((category) => (
        <li key={category}>
          <LocalizedLink to={`/catalog/${category}`} className="banner-card h-full">
            <span className="flex flex-1 flex-col justify-between p-5 pr-10">
              <span>
                <span className="block text-xs text-ink-500">{t('banners.eyebrow')}</span>
                <span className="mt-1 block text-base font-extrabold leading-tight">
                  {t(`categories.${category}`)}
                </span>
                <span className="block text-xs text-ink-500">{t('banners.subtitle')}</span>
              </span>
              <Icon name={CATEGORY_ICONS[category]} size={52} className="mt-4 text-ink-700" />
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ul>
  );
}

export default CategoryBanners;
