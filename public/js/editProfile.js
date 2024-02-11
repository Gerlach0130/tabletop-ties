document.addEventListener('DOMContentLoaded', (event) => {
    const editProfileForm = document.getElementById('edit-profile-form');
    editProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const location = document.getElementById('location').value;
        
        const response = await fetch('/api/users/profile/edit', {
            method: 'POST',
            body: JSON.stringify({ name, email, location }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update profile.');
        }
    });
});