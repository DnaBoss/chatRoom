const { io, server } = require('../../io/server');
const Lobby = require('./lobby');
class SocketHandler {

    /**
     * Creates an instance of SocketHandler.
     * @param {Lobby} lobby
     * @param {server} server
     * @memberof SocketHandler
     */
    constructor(lobby, server, io) {
        this.lobby = lobby;
        this.server = server;
        this.io = io;
    }

    /**
     *
     *
     * @static
     * @returns {SocketHandler}
     * @memberof SocketHandler
     */
    static getInstance(lobby, server, io) {
        return this._instance = this._instance || new SocketHandler(lobby, server, io);
    }

    /**
     *
     *
     * @param {number} port
     * @memberof SocketHandler
     */
    listen(port) {
        this.server.listen(port, _ => {
            console.log(`app listening on port ${port} : ${new Date()}`);
        })
    }

    start() {
        io.use((socket, next) => {
            // TODO:should verify socket here
            socket.name = socket.handshake.query.name;
            socket.userId = socket.handshake.query.userId;
            next();
        }).on('connect', this.connect.bind(this));
    }

    connect(socket) {
        this.lobby.connect(socket);
        this.join(socket);
        this.on(socket);
    }

    join(socket) {
        // 幫使用者加入必需的房間
        socket.join('lobby');
        socket.join('chat');
        socket.join(`channel:${socket.userId}`);
        socket.join(`channel:${socket.name}`);
    }

    on(socket) {
        // 註冊各個事件
        socket.on("login", data => this.login.bind(this)(socket, data));
        socket.on("disconnect", _ => this.disconnect.bind(this)(socket));
        socket.on("chat", data => this.chat.bind(this)(socket, data));
        socket.on("broadcast", data => this.broadcast.bind(this)(socket, data));
        socket.on("whisper", data => this.whisper.bind(this)(socket, data));
    }

    login(socket) {
        // 告知聊天室內的使用者，有人進來了
        const id = socket.id;
        const name = socket.name;
        this.lobby.login(id, name);
    }

    chat(socket, data) {
        const id = socket.id;
        if (!this.lobby.isLegalFrequency(id)) {
            return this.lobby.sendIllegalMsg(id);
        }

        // 發送聊天訊息
        const from = socket.name;
        const msg = data.msg;
        // TODO: 可以設計成多房間，需再多加 room id 為參數
        this.lobby.chat(id, from, msg);
    }

    broadcast(socket, data) {
        this.lobby.broadcast();
    }

    whisper(socket, data) {
        const id = socket.id;
        if (!this.lobby.isLegalFrequency(id)) {
            return this.lobby.sendIllegalMsg(id);
        }

        const from = socket.name;
        const sendTo = data.sendTo;
        const msg = data.msg;
        this.lobby.whisper(id, from, sendTo, msg);
    }

    disconnect(socket) {
        const id = socket.id;
        try {
            this.lobby.disconnect(id);
        } catch (err) {

        }
    }
}
module.exports = SocketHandler;