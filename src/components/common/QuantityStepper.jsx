import PropTypes from 'prop-types';
import { MAX_QUANTITY, MIN_QUANTITY } from '../../context/CartContext';
import { useI18n } from '../../i18n/I18nContext';
import Icon from './Icon';

function QuantityStepper({ value, onChange }) {
  const { t } = useI18n();
  return (
    <div className="stepper">
      <button
        type="button"
        className="stepper__button"
        aria-label={t('product.decrease')}
        disabled={value <= MIN_QUANTITY}
        onClick={() => onChange(value - 1)}
      >
        <Icon name="minus" size={14} />
      </button>
      <output className="stepper__value" aria-live="polite">{value}</output>
      <button
        type="button"
        className="stepper__button"
        aria-label={t('product.increase')}
        disabled={value >= MAX_QUANTITY}
        onClick={() => onChange(value + 1)}
      >
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}

QuantityStepper.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuantityStepper;
