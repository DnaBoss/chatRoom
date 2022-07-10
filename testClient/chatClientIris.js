const io = require('socket.io-client');
const socket = io("ws://127.0.0.1:3310", { path: "/chat", 'query': { name: 'Iris', userId: 2 } });
socket.on('connect', () => {
    socket.emit('login');
});

socket.on('login', data => {
    console.log(`${data.msg} 進來了`);
    socket.emit('chat', { msg: 'hi all, i am Iris' });
})

// {from:string,msg:string}
socket.on('chat', (data) => {
    console.log('receive room message', data);
})

socket.on('whisper', data => {
    console.log(`您收到了來自${data.from} 的密語 :${data.msg}`);
});