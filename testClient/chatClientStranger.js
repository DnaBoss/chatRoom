const io = require('socket.io-client');
const socket = io("ws://127.0.0.1:3310", { path: "/chat", 'query': { name: 'stranger', userId: 3 } });
socket.on('connect', () => {
    socket.emit('login');
});

socket.on('chat', (data) => {
    console.log('receive room message', data);
})

socket.on('login', data => {
    console.log(`${data.msg} 進來了`);
    socket.emit('chat', { msg: 'hi all, i am stranger' });
})

socket.on(`channel:stranger`, data => {
    console.log(' stranger 您在短時間進行了過多操作，請稍微休一下');
})

socket.on(`channel:3`, data => {
    console.log(' user 3 您在短時間進行了過多操作，請稍微休一下');
})

socket.on('whisper', data => {
    console.log(`您收到了來自${data.from} 的密語 :${data.msg}`);
});