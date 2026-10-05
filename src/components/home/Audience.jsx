import { useI18n } from '../../i18n/I18nContext';
import Icon from '../common/Icon';
import Logo from '../common/Logo';

const AUDIENCE_ICONS = ['chart', 'warehouse', 'bag', 'users', 'truck'];

function Audience() {
  const { t } = useI18n();
  return (
    <section className="card grid overflow-hidden md:grid-cols-2" aria-labelledby="audience-title">
      <div className="p-8 md:p-10">
        <h2 id="audience-title" className="section-title !text-base !normal-case">
          {t('audience.title')}
        </h2>
        <ul className="mt-6 space-y-5">
          {t('audience.items').map((item, index) => (
            <li key={item} className="flex items-center gap-4 text-base">
              <Icon name={AUDIENCE_ICONS[index]} size={26} className="shrink-0 text-ink-700" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative isolate min-h-[260px]">
        <img
          src="/images/slide-yellow-600.webp"
          srcSet="/images/slide-yellow-600.webp 600w, /images/slide-yellow-1200.webp 1200w"
          sizes="(min-width: 768px) 600px, 100vw"
          alt={t('audience.imageAlt')}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="flex h-full items-center justify-center bg-ink-900/20 p-8">
          <Logo className="w-full max-w-[280px] text-ink drop-shadow" />
        </div>
      </div>
    </section>
  );
}

export default Audience;
