import PropTypes from 'prop-types';
import { useI18n } from '../../i18n/I18nContext';

function Logo({ className = '' }) {
  const { t } = useI18n();
  return (
    <svg
      viewBox="0 0 168 54"
      role="img"
      aria-label="SNP"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="36"
        fontSize="40"
        fontWeight="800"
        fill="currentColor"
        textLength="168"
        lengthAdjust="spacingAndGlyphs"
      >
        SNP
      </text>
      <rect x="0" y="41" width="168" height="13" fill="#FECE3A" />
      <text
        x="4"
        y="50.5"
        fontSize="8"
        fontWeight="800"
        fill="#000"
        textLength="160"
        lengthAdjust="spacingAndGlyphs"
      >
        {t('common.tagline')}
      </text>
    </svg>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
