/*///////////////////////////////////////////////////////////
  EVENT LISTENER FOR CONTACT FORM SUBMISSION
///////////////////////////////////////////////////////////*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default submission
      
      // Clear previous error messages
      document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
      
      let isValid = true;
      
      // Name Validation
      const nameInput = document.getElementById('contact-name');
      if (nameInput.value.trim() === '') {
        isValid = false;
        document.getElementById('nameError').textContent = 'Name is required.';
      }
      
      // Email Validation
      const emailInput = document.getElementById('contact-email');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
      if (emailInput.value.trim() === '') {
        isValid = false;
        document.getElementById('emailError').textContent = 'Email is required.';
      } else if (!emailPattern.test(emailInput.value)) {
        isValid = false;
        document.getElementById('emailError').textContent = 'Invalid email format.';
      }
      
      // Message Validation
      const messageInput = document.getElementById('contact-message');
      if (messageInput.value.trim() === '') {
        isValid = false;
        document.getElementById('messageError').textContent = 'Message is required.';
      }
      
      // If valid, proceed with form submission
      if (isValid) {
        form.submit(); // Only submit if all validations pass
      }
    });
  });