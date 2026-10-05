import PropTypes from 'prop-types';
import { useI18n } from '../../i18n/I18nContext';

function FormStatus({ status, successText }) {
  const { t } = useI18n();
  if (status === 'success') {
    return <p role="status" className="form-status form-status--success">{successText}</p>;
  }
  if (status === 'unavailable') {
    return <p role="alert" className="form-status form-status--error">{t('common.serviceUnavailable')}</p>;
  }
  if (status === 'error') {
    return <p role="alert" className="form-status form-status--error">{t('common.genericError')}</p>;
  }
  return null;
}

FormStatus.propTypes = {
  status: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
};

export default FormStatus;
