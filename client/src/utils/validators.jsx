const validators = {
  isEmail: (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.trim());
  },

  isPasswordStrong: (password) => {
    // Minimum 6 characters, at least one letter and one number
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return pattern.test(password);
  },

  isNotEmpty: (value) => {
    return value && value.trim().length > 0;
  },

  isValidName: (name) => {
    const pattern = /^[A-Za-z\s]{2,}$/;
    return pattern.test(name.trim());
  },

  isValidSymptomInput: (text) => {
    return text && text.trim().length >= 10;
  },

  isValidQuantity: (qty) => {
    return !isNaN(qty) && Number(qty) >= 0;
  },

  isValidDate: (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }
};

export default validators;