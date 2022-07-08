/*chat.js*/
$(function(){
    /*建立socket連接，連向server監聽的端口號*/
    const socket = io("ws://127.0.0.1:3310", {path:"/chat" });
    /*你的名稱*/
    var myName = null;

    /*登入事件*/
    $('.login-btn').click(function(){
        myName = $.trim($('#loginName').val());
        if(myName){
            /*發送事件*/
            socket.emit('login', {username: myName})
        }else{
            alert('Please enter a name:)')
        }
    })
})



 