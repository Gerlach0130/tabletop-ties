// required packages and files
const socketIo = require('socket.io');
const withAuth = require('./auth');

// initialize connection to socket
// authorizes user then connects
function initializeSocket(server) {
    const io = socketIo(server);
    io.use((socket, next) => {
        withAuth(socket.request, {}, (err) => {
            if (err) {
                return next(new Error('Authentication failed'));
            }
            socket.userId = socket.request.session.user_id;
            next();
        });
    });
    io.on('connection', (socket) => {
        console.log( `${socket.userId} connected`);
        handleDirectMessage(socket, io);
        socket.on('disconnect', () => {
            console.log(`${socket.userId} disconnected`);
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