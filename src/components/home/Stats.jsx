import { useI18n } from '../../i18n/I18nContext';

function Stats() {
  const { t } = useI18n();
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {t('stats').map((stat) => (
        <li key={stat.value} className="stat-card">
          <p className="stat-card__value">{stat.value}</p>
          <p className="stat-card__label">
            <span className="stat-card__accent">{stat.accent}</span>
            <br />
            {stat.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default Stats;
