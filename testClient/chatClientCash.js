const io = require('socket.io-client');
const socket = io("ws://127.0.0.1:3310", { path: "/chat" });
socket.on('connect', () => {
    socket.emit('login', { name: 'cash' })
    // for (let i = 1; i <= 6; i++) {
    //     socket.emit('chat', { msg: 'hi all, i am cash' });
    // }
    // setTimeout(function () {
    //     socket.emit('chat', { msg: 'hi all, i am cash, again' });
    // }, 10000);
});

// {from:string,msg:string}
socket.on('chat', (data) => {
    console.log('receive room message', data);
})

socket.on('loginSuccess', _ => socket.emit('chat', { msg: 'hi all, i am Cash' }));
socket.on('loginFail', _ => console.log('登入失敗，請換個名字試試'));
socket.on('userJoin', data => console.log('userJoin data', data));

socket.on(`channel:cash`, data => {
    console.log(' cash 您在短時間進行了過多操作，請稍微休一下');
})

socket.on('whisper', data => {
    console.log(`您收到了來自${data.from} 的密語 :${data.msg}`);
});