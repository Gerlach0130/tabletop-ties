// Defines async form handler
const signupFormHandler = async (event) => {
  // Prevents the default form submission behavior
  event.preventDefault();

  // Variables with trimmed inputs
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const username = document.querySelector('#username').value.trim();
    
  // Checks if all form fields have values before proceeding
  if (name && email && password && username) {
    // Async POST request to the server endpoint '/api/users/signup' with the form data
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, username }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    // Response checker
    if (response.ok) {
      document.location.replace('/profile'); // Redirect to profile page
    } else {
      alert('Signup failed, Please try again -- Be sure to fill out all fields and have a password at least 8 characters in length');
    }
  }
};

// Event listeners
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);