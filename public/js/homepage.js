const loginButton = async (event) => {
    event.preventDefault();
    const response = await fetch('/login', {
        method: 'GET',
    });
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
};

const signUpButton = async (event) => {
    event.preventDefault();
    const response = await fetch('/signup', {
        method: 'GET',
    });
    if (response.ok) {
        document.location.replace('/signup');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.login-button').addEventListener('click', loginButton);
document.querySelector('.signup-button').addEventListener('click', signUpButton);