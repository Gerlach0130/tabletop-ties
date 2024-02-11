// Defines async form handler
const editProfileFormHandler = async (event) => {
    // Prevents the default form submission behavior
    event.preventDefault();

    // Variables with trimmed inputs
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const location = document.querySelector('#location').value.trim();
    
    // Checks if all form fields have values before proceeding
    if (name && email && location) {
        // Async POST request to the server endpoint '/api/users/profile/edit' with the form data
        const response = await fetch('/api/users/profile/edit', {
            method: 'POST',
            body: JSON.stringify({ name, email, location }),
            headers: { 'Content-Type': 'application/json' },
        });

        // Response checker
        if (response.ok) {
            document.location.replace('/profile'); // Redirect to profile page
        } else {
            alert('Failed to update profile.');
        }
    }
};

// Event listeners
document.querySelector('#edit-profile-form').addEventListener('submit', editProfileFormHandler);