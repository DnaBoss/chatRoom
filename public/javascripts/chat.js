$(function () {
    const socket = io("ws://127.0.0.1:3310", { path: "/chat" });
    let name = null;
    $('.login-btn').click(function () {
        name = $.trim($('#loginName').val());
        if (name) {
            socket.emit('login', { name })
        } else {
            alert('Please enter a name:)')
        }
    })
    socket.on('loginSuccess', _ => {
        checkIn();
        socket.emit('chat', { msg: `hi all,i am ${name}` })
    });
    socket.on('loginFail', _ => console.log('登入失敗，請換個名字試試'));
    socket.on('userJoin', data => {
        var html = `<p>${data.name} 加入聊天室</p>`
        $('.chat-con').append(html);
        document.getElementById('chat-title').innerHTML = `在線人數: ${data.userCount}`
    });
    /*隱藏登入頁，顯示聊天頁*/
    function checkIn() {
        $('.login-wrap').hide('slow');
        $('.chat-wrap').show('slow');
    }

    /*按下send按鈕*/
    $('.sendBtn').click(function () {
        sendMessage()
    });

    /*按下Enter*/
    $(document).keydown(function (evt) {
        if (evt.keyCode == 13) {
            sendMessage()
        }
    })

    function sendMessage() {
        const msg = $('#sendtxt').val();
        $('#sendtxt').val('');
        if (msg) {
            /*觸發 sendMessage 事件*/
            socket.emit('sendMsg', { msg })
        }
    }

    /*監聽 receiveMessage事件*/
    socket.on('receiveMsg', function (data) {
        showMessage(data);
    })

    /*顯示訊息*/
    function showMessage(data) {
        var html;
        if (data.from == name) {
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



