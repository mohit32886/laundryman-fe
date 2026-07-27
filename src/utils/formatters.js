/**
 * Centralized Formatting Utilities (DRY Principle)
 * Standardizes currency, phone number, and date displays across frontend UI components.
 */

export const formatCurrency = (amount = 0) => {
  const num = Number(amount) || 0;
  return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

export const formatPhoneNumber = (phone = '') => {
  const digits = String(phone).replace(/\D/g, '');
  const tenDigits = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  if (tenDigits.length === 10) {
    return `+91 ${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`;
  }
  return phone;
};

export const formatDateDisplay = (dateString, options = {}) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return String(dateString);
  
  const defaultOpts = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('en-IN', defaultOpts).format(date);
};
