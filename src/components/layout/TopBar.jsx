import { useI18n } from '../../i18n/I18nContext';
import Icon from '../common/Icon';
import LocalizedLink from '../common/LocalizedLink';
import LanguageSwitcher from './LanguageSwitcher';

function TopBar() {
  const { t } = useI18n();
  return (
    <div className="top-bar">
      <div className="container-page flex items-center justify-between gap-4 py-2.5">
        <p className="flex items-center gap-1.5">
          <Icon name="pin" size={14} />
          {t('common.city')}
        </p>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <LocalizedLink to="/login" className="flex items-center gap-1.5 hover:text-brand">
            <Icon name="user" size={14} />
            <span className="hidden sm:inline">{t('common.myAccount')}</span>
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
