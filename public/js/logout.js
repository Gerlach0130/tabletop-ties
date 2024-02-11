// Login functionality
const logoutFormHandler = async () => {
  const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
      document.location.replace('/');
  } else {
      alert('Logout Failed, Please try again.');
  };
};

// Event Listener for 'Logout' button
document
  .querySelector('#logout')
  .addEventListener('click', logoutFormHandler);

// Timed Logout Functionality
let logoutTimer;
const TIMEOUT = 10 * 60 * 1000; // 10 min idle log out

// Resets the logout timer
function resetTimer() {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => {
      // Calls the logout function
      logoutFormHandler();
  }, TIMEOUT);
}

// Event listeners
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);
document.addEventListener('scroll', resetTimer);
document.addEventListener('click', resetTimer);

// Initialize the timer
resetTimer();