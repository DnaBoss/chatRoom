const app = require('../app');
server = require('http').createServer(app);
const io = require('socket.io')(server, {
    path: '/chat',
    pingInterval: 10000,
    pingTimeout: 5000
});


module.exports = {
    io,server
};