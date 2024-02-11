document.addEventListener('DOMContentLoaded', () => {
    const addGameForm = document.getElementById('addGameForm');
    addGameForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            title: document.getElementById('title').value.trim(),
            genre: document.getElementById('genre').value.trim(),
            player_count: document.getElementById('player_count').value.trim(),
            avg_play_time: document.getElementById('avg_play_time').value.trim(),
            description: document.getElementById('description').value.trim(),
        };

        const response = await fetch('/api/games', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Game added successfully!');
            document.location.href = '/';
        } else {
            alert('Failed to add game.');
        }
    });
});