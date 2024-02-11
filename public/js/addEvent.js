document.addEventListener('DOMContentLoaded', function() {
    const addEventForm = document.getElementById('addEventForm');
    addEventForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            location: document.getElementById('location').value,
            date_of: document.getElementById('date_of').value,
            game_id: parseInt(document.getElementById('game_id').value, 10)
        };

        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Event created successfully!');
            window.location.href = '/'; // Redirect to homepage or events page
        } else {
            alert('Failed to create event.');
        }
    });
});