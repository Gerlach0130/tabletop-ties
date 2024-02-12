// connects to the server via Socket.io
const socket = io();

// sends a message to the server
function sendMessage(){
    const message = document.getElementById('messageInput').ariaValueMax;
    socket.emit('direct message', {recipientId: 'recipientId', message: message });
    document.getElementById('messageInput').value = '';
}

// listens for messages from the server
socket.on('direct_message', (data) => {
    const messageDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.senderId}: ${data.message}`;
    messageDiv.appendChild(messageElement);
});

// attaches event listener to the send button
document.getElementById('sendButton').addEventListener('click', sendMessage);