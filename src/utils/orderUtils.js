/**
 * Generates a unique Order ID like PKO-20260707-XXXX
 */
export const generateOrderId = () => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randPart = Math.floor(1000 + Math.random() * 9000);
  return `PKO-${datePart}-${randPart}`;
};

/**
 * Formats a Date object or ISO string to "DD MMM YYYY"
 */
export const formatDate = (dateInput) => {
  const d = new Date(dateInput);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

/**
 * Returns estimated delivery date (current date + 2-3 days)
 */
export const getEstimatedDelivery = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return formatDate(d);
};

/**
 * All possible order statuses in order
 */
export const ORDER_STATUSES = ['Ordered', 'Preparing', 'Out for Delivery', 'Delivered'];

/**
 * Returns badge color class for order status
 */
export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Ordered':       return 'badge-ordered';
    case 'Preparing':     return 'badge-preparing';
    case 'Out for Delivery': return 'badge-ofd';
    case 'Delivered':     return 'badge-delivered';
    default:              return 'badge-ordered';
  }
};

/**
 * Randomly assigns a status for demo/testing purposes
 * (new orders always start as 'Ordered')
 */
export const randomDemoStatus = () => {
  const idx = Math.floor(Math.random() * ORDER_STATUSES.length);
  return ORDER_STATUSES[idx];
};

/**
 * Calculates delivery charge based on cart total
 */
export const getDeliveryCharge = (total) => {
  if (total >= 500) return 0;
  return 49;
};
