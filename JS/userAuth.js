/*///////////////////////////////////////////////////////////
  SINGLE USER AUTHENTICATION FORM VALIDATION
///////////////////////////////////////////////////////////*/

// Utility function to validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Utility function to validate password
function validatePassword(password) {
  // Password must be at least 8 characters, including one number and one special character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Utility function to validate phone numbers
function validatePhone(phone) {
  const phoneRegex = /^\d{3} \d{3} \d{4}$/; // Matches format "123 456 7890"
  return phoneRegex.test(phone);
}

// Utility function to check if a field is not empty
function validateNotEmpty(value) {
  return value.trim() !== '';
}

// Utility function to validate birthday (optional)
function validateBirthday(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();
  return birthDate <= today; // Birthday cannot be in the future
}

// Function to validate the login form
function validateLoginForm() {
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  let isValid = true;
  let errors = [];

  // Validate email
  if (!validateEmail(emailInput.value)) {
    isValid = false;
    errors.push('Invalid email format.');
  }

  // Validate password
  if (!validatePassword(passwordInput.value)) {
    isValid = false;
    errors.push('Password must be at least 8 characters and include a number and a special character.');
  }

  if (!isValid) {
    alert(errors.join('\n')); // Show errors to the user using the alert function which displays the errors in a pop-up box.
  }

  return isValid;
}

// Function to validate the sign-up form
function validateSignupForm() {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const birthdayInput = document.getElementById('birthday');
  const genderInput = document.getElementById('gender');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  let isValid = true;
  let errors = [];

  // Validate first and last name
  if (!validateNotEmpty(firstNameInput.value)) {
    isValid = false;
    errors.push('First name is required.');
  }
  if (!validateNotEmpty(lastNameInput.value)) {
    isValid = false;
    errors.push('Last name is required.');
  }

  // Validate birthday
  if (!validateBirthday(birthdayInput.value)) {
    isValid = false;
    errors.push('Invalid birthday.');
  }

  // Validate gender
  if (!validateNotEmpty(genderInput.value)) {
    isValid = false;
    errors.push('Gender is required.');
  }

  // Validate phone
  if (!validatePhone(phoneInput.value)) {
    isValid = false;
    errors.push('Phone number must be in the format "123 456 7890".');
  }

  // Validate email
  if (!validateEmail(emailInput.value)) {
    isValid = false;
    errors.push('Invalid email format.');
  }

  // Validate password
  if (!validatePassword(passwordInput.value)) {
    isValid = false;
    errors.push('Password must be at least 8 characters and include a number and a special character.');
  }

  if (!isValid) {
    alert(errors.join('\n')); // Show errors to the user
  }

  return isValid;
}

// Event listener for forms
document.addEventListener('DOMContentLoaded', () => {
  // Login form validation
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateLoginForm()) {
        // Perform login logic here
        alert('Login successful.');
      }
    });
  }

  // Sign-up form validation
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateSignupForm()) {
        // Perform sign-up logic here
        alert('Sign-up successful!');
      }
    });
  }
});
