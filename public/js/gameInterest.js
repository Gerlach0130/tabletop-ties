// Functionality to add game to interest
const gameInterestFormHandler = async (event) => {
    event.preventDefault();

    const game_id = document.getElementById('gameInterest').dataset.gameid;
    console.log(game_id);

    if (game_id) {
        const response = await fetch('/api/games/add', {
            method: 'POST',
            body: JSON.stringify({ game_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        // Response checker
        if (response.ok) {
            document.location.replace('/profile'); // Redirect to profile page
        } else {
            alert('Failed to add to interest.');
        }
    }
};

// Event Listener 
document.getElementById('gameInterest').addEventListener('click', gameInterestFormHandler);