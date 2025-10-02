const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const passwordStrength = (password) => {
  if (password.length >= 8) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strengthCriteria = [
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChars,
    ].filter(Boolean).length;

    if (strengthCriteria >= 3) {
      return "Strong";
    } else if (strengthCriteria === 2) {
      return "Medium";
    }
  }
  return "Weak";
};

export {
  validateEmail,
  passwordStrength,
};
