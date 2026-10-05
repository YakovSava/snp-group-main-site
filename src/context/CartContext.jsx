import {
  createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState,
} from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../data/products';

const STORAGE_KEY = 'snp.cart.v1';
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

const CartContext = createContext(null);

function clamp(value) {
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value));
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'restore':
      return action.items;
    case 'add': {
      const exists = state.some((item) => item.id === action.id);
      if (!exists) {
        return [...state, { id: action.id, quantity: clamp(action.quantity) }];
      }
      return state.map((item) => (
        item.id === action.id ? { ...item, quantity: clamp(item.quantity + action.quantity) } : item
      ));
    }
    case 'setQuantity':
      return state.map((item) => (
        item.id === action.id ? { ...item, quantity: clamp(action.quantity) } : item
      ));
    case 'remove':
      return state.filter((item) => !action.ids.includes(item.id));
    case 'clear':
      return [];
    default:
      return state;
  }
}

function readStoredItems() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item) => getProductById(item.id) && Number.isInteger(item.quantity))
      : [];
  } catch (error) {
    return [];
  }
}

function persistItems(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch (error) {
    return false;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    dispatch({ type: 'restore', items: readStoredItems() });
    setIsRestored(true);
  }, []);

  useEffect(() => {
    if (!isRestored) {
      return;
    }
    persistItems(items);
  }, [items, isRestored]);

  const add = useCallback((id, quantity = 1) => dispatch({ type: 'add', id, quantity }), []);
  const setQuantity = useCallback((id, quantity) => dispatch({ type: 'setQuantity', id, quantity }), []);
  const remove = useCallback((ids) => dispatch({ type: 'remove', ids }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo(() => {
    const lines = items.map((item) => ({ ...item, product: getProductById(item.id) }));
    return {
      lines,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [items, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}

export { MIN_QUANTITY, MAX_QUANTITY };
