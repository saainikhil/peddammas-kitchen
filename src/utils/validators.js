/**
 * Validates a mobile number (10 digits, starts with 6-9)
 */
export const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile.trim());

/**
 * Validates a pincode (6 digits)
 */
export const isValidPincode = (pincode) => /^\d{6}$/.test(pincode.trim());

/**
 * Validates a non-empty string
 */
export const isNonEmpty = (value) => value.trim().length > 0;

/**
 * Validates minimum length
 */
export const isMinLength = (value, min) => value.trim().length >= min;

/**
 * Validates an email address
 */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/**
 * Validates an address form object.
 * Returns an errors object — empty means valid.
 */
export const validateAddressForm = (form) => {
  const errors = {};
  if (!isNonEmpty(form.fullName))   errors.fullName   = 'Full name is required';
  else if (!isMinLength(form.fullName, 3)) errors.fullName = 'Name must be at least 3 characters';

  if (!isNonEmpty(form.mobile))     errors.mobile     = 'Mobile number is required';
  else if (!isValidMobile(form.mobile)) errors.mobile = 'Enter a valid 10-digit mobile number';

  if (!isNonEmpty(form.houseNo))    errors.houseNo    = 'House / Flat number is required';
  if (!isNonEmpty(form.street))     errors.street     = 'Street / Area is required';
  if (!isNonEmpty(form.city))       errors.city       = 'City is required';
  if (!isNonEmpty(form.state))      errors.state      = 'State is required';

  if (!isNonEmpty(form.pincode))    errors.pincode    = 'Pincode is required';
  else if (!isValidPincode(form.pincode)) errors.pincode = 'Enter a valid 6-digit pincode';

  return errors;
};

/**
 * Validates a profile form
 */
export const validateProfileForm = (form) => {
  const errors = {};
  if (!isNonEmpty(form.name))    errors.name  = 'Name is required';
  if (!isNonEmpty(form.email))   errors.email = 'Email is required';
  else if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address';

  if (form.phone && !isValidMobile(form.phone)) {
    errors.phone = 'Enter a valid 10-digit mobile number';
  }
  return errors;
};
