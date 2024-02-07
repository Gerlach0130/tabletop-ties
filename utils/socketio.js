// required packages and files
const socketIo = require('socket.io');

// initialize connection to socket
function initializeSocket(server) {
    const io = socketIo(server);
    io.on('connection', (socket) => {
        console.log('A user connected');
        // add in event functionality here
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
    return io;
}

// handles direct messages

module.exports = {initializeSocket};