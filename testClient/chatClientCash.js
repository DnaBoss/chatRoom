const io = require('socket.io-client');
const socket = io("ws://127.0.0.1:3310", { path: "/chat", 'query': { name: 'cash', userId: 1 } });
socket.on('connect', () => {

    for (let i = 1; i <= 6; i++) {
        socket.emit('chat', { msg: 'hi all, i am cash' });
    }
    setTimeout(function () {
        socket.emit('chat', { msg: 'hi all, i am cash, again' });
    }, 10000);
});

// {from:string,msg:string}
socket.on('chat', (data) => {
    console.log('receive room message', data);
})

socket.on('login', data => {
    console.log(`${data.msg} 進來了`);
    // socket.emit('chat', { msg: 'hi all, i am cash' });
    // socket.emit('whisper', { msg: 'hi Iris i am cash', sendTo: 'Iris' });
})

socket.on(`channel:cash`, data => {
    console.log(' cash 您在短時間進行了過多操作，請稍微休一下');
})

socket.on(`channel:1`, data => {
    console.log(' user 1 您在短時間進行了過多操作，請稍微休一下',Date.now());

})

socket.on('whisper', data => {
    console.log(`您收到了來自${data.from} 的密語 :${data.msg}`);
});