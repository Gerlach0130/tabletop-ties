// required packages and files
const socketIo = require('socket.io');

// initialize connection to socket
function initializeSocket(server) {
    const io = socketIo(server);
    io.on('connection', (socket) => {
        console.log('A user connected');
        handleDirectMessage(socket, io);
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
    return io;
}

// handles direct messages
function handleDirectMessage(socket, io) {
    socket.on('direct message', (data) => {
        const {recipientId, message } = data;
        const recipientSocket = io.sockets.sockets.get(recipientId);
        if (recipientSocket) {
            recipientSocket.emit('direct_message', {
                senderId: socket.id,
                message: message
            });
            socket.emit('message_delivery_status', {
                recipientId: recipientId,
                status: 'delivered'
            });
        } else {
            console.log(`${recipientId} is not online.`);
            socket.emit('message_delivery_status', {
                recipientId: recipientId,
                status: 'failed'
            });
        }
    });
}
module.exports = {initializeSocket};