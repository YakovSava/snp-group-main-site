import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useI18n } from '../../i18n/I18nContext';

function LocalizedLink({
  to,
  children,
  className = undefined,
  onClick = undefined,
  ariaLabel = undefined,
  ariaCurrent = undefined,
}) {
  const { toLocalized } = useI18n();
  const [pathAndQuery, hash] = to.split('#');
  const target = `${toLocalized(pathAndQuery || '/')}${hash ? `#${hash}` : ''}`;
  return (
    <Link
      to={target}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </Link>
  );
}

LocalizedLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  ariaCurrent: PropTypes.string,
};

export default LocalizedLink;
