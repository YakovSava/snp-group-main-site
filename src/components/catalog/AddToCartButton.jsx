import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { useI18n } from '../../i18n/I18nContext';
import Icon from '../common/Icon';

const FEEDBACK_DURATION_MS = 1500;

function AddToCartButton({ productId, quantity = 1, variant = 'icon' }) {
  const { t } = useI18n();
  const { add } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!isAdded) {
      return undefined;
    }
    const timer = setTimeout(() => setIsAdded(false), FEEDBACK_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isAdded]);

  const handleClick = () => {
    add(productId, quantity);
    setIsAdded(true);
  };

  if (variant === 'full') {
    return (
      <button type="button" className="btn btn--outline" onClick={handleClick}>
        <Icon name={isAdded ? 'check' : 'cart'} size={16} />
        {isAdded ? t('product.added') : t('common.buy')}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="icon-button shrink-0"
      aria-label={isAdded ? t('product.added') : t('common.addToCart')}
      onClick={handleClick}
    >
      <Icon name={isAdded ? 'check' : 'cart'} size={16} />
    </button>
  );
}

AddToCartButton.propTypes = {
  productId: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  variant: PropTypes.oneOf(['icon', 'full']),
};

export default AddToCartButton;
