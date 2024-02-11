// Defines async form handler
const loginFormHandler = async (event) => {
  // Prevents the default form submission behavior
  event.preventDefault();

  // Variables with trimmed inputs
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  
  // Checks if all form fields have values before proceeding
  if (email && password) {
    // Async POST request to the server endpoint '/api/users/login' with the form data
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Response checker
    if (response.ok) {
      document.location.replace('/profile'); // Redirect to profile page
    } else {
      alert(response.statusText);
    }
  }
};

// Event listeners
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);