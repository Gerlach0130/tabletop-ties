// INCOMPLETE
// INCOMPLETE
// INCOMPLETE

const newFormHandler = async (event) => {
    event.preventDefault();
    const game = document.querySelector('#game-preference');
    const location = document.querySelector('#user-location');
    
    if (gameName && location) {
        const response = await fetch('/api/games', {
            method: 'POST',
            body: JSON.stringify({ game, location }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document-location.replace('/profile');
        } else {
            alert('Failed to update profile');
        }
    }
};