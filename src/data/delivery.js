const DELIVERY_METHODS = [
  { id: 'courier', price: 2500, needsAddress: true },
  { id: 'pickup', price: 0, needsAddress: false },
  { id: 'point', price: 1500, needsAddress: true },
];

export function getDeliveryMethod(id) {
  return DELIVERY_METHODS.find((method) => method.id === id);
}

export default DELIVERY_METHODS;
