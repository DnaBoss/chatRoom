const io = require('socket.io-client');
const socket = io("ws://127.0.0.1:3310", { path: "/chat" });
const name = 'Cash';
socket.on('connect', () => {
    socket.emit('login', { name })
    for (let i = 1; i <= 6; i++) {
        socket.emit('sendMsg', { msg: `hi all, i am ${name}` });
    }
    setTimeout(function () {
        socket.emit('sendMsg', { msg: `hi all, i am ${name} again` });
    }, 10000);
});

// {from:string,msg:string}
socket.on('receiveMsg', (data) => {
    console.log('receive room message', data);
})

socket.on(`channel:cash`, data => {
    console.log(`${name},too many action i short time,plz take a rest for a while`);
})
