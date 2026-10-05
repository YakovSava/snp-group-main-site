import { useI18n } from '../../i18n/I18nContext';
import Icon from '../common/Icon';
import LocalizedLink from '../common/LocalizedLink';

const PERKS = [
  { key: 'register', icon: 'userCheck', to: '/register' },
  { key: 'discount', icon: 'percent', to: '/register' },
  { key: 'order', icon: 'box', to: '/catalog' },
  { key: 'delivery', icon: 'shield', to: '/delivery' },
];

function Perks() {
  const { t } = useI18n();
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {PERKS.map((perk) => (
        <li key={perk.key}>
          <LocalizedLink to={perk.to} className="perk-card h-full">
            <Icon name={perk.icon} size={44} />
            <span>{t(`perks.${perk.key}`)}</span>
          </LocalizedLink>
        </li>
      ))}
    </ul>
  );
}

export default Perks;
