$(function () {
    const socket = io("ws://127.0.0.1:3310", { path: "/chat" });
    let name = null;
    socket.on('connect', () => {
        $('.chat-wrap').hide('slow');
        $('.login-wrap').show('slow');
    })
    $('.login-btn').click(function () {
        name = $.trim($('#loginName').val());
        if (name) {
            socket.emit('login', { name })
        } else {
            alert('Please enter a name:)')
        }
    })
    socket.on('loginSuccess', data => {
        checkIn();
        id = data.id;
        socket.emit('chat', { msg: `hi all,i am ${name}` })
    });
    socket.on('loginFail', _ => console.log('login fail plz choose other nick name'));
    socket.on('userJoin', data => {
        var html = `<p>${data.name} join chat room</p>`
        $('.chat-con').append(html);
        document.getElementById('chat-title').innerHTML = `online user: ${data.userCount}`
    });

    /*hide login page，show the chat room page*/
    function checkIn() {
        $('.login-wrap').hide('slow');
        $('.chat-wrap').show('slow');
    }

    /*when push send button*/
    $('.sendBtn').click(function () {
        sendMessage()
    });

    /*when push  Enter of keyboard*/
    $(document).keydown(function (evt) {
        if (evt.keyCode == 13) {
            sendMessage()
        }
    })

    function sendMessage() {
        const msg = $('#sendtxt').val();
        $('#sendtxt').val('');
        if (msg) {
            /*trigger sendMessage event*/
            socket.emit('sendMsg', { msg, name })
        }
    }

    /*listen receiveMessage event*/
    socket.on('receiveMsg', function (data) {
        showMessage(data);
    })


    function showMessage(data) {
        var html;
        if (data.id == socket.id) {
            html = `<div class="chat-item item-right clearfix">
                    <span class="abs uname">me</span>
                    <span class="message fr">${data.msg}</span>
                </div>`
        } else {
            html = `<div class="chat-item item-left clearfix rela">
                    <span class="abs uname">${data.from}</span>
                    <span class="fl message">${data.msg}</span>
                </div>`
        }
        $('.chat-con').append(html);
    }
})



