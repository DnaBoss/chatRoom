const io = require('socket.io-client');
const socket = io("ws://127.0.0.1:3310", { path: "/chat" });
socket.on('connect', () => {
    socket.emit('login', { name: 'Iris' });
    // socket.emit('login', { name: 'cash' })
});
socket.on('loginSuccess', _ => socket.emit('chat', { msg: 'hi all, i am Iris' }));
socket.on('loginFail', _ => console.log('登入失敗，請換個名字試試'));
socket.on('userJoin', data => console.log(`${data.name} 進來了`));


// {from:string,msg:string}
socket.on('chat', (data) => {
    console.log('receive room message', data);
})

socket.on('whisper', data => {
    console.log(`您收到了來自${data.from} 的密語 :${data.msg}`);
});