document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default submission
      
      // Clear previous error messages
      document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
      
      let isValid = true;
      
      // Name Validation
      const nameInput = document.getElementById('first-name');
      if (nameInput.value.trim() === '') {
        isValid = false;
        document.getElementById('nameError').textContent = 'Name is required.';
      }