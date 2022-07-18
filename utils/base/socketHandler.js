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
            next();
        }).on('connect', this.connect.bind(this));
    }

    connect(socket) {
        this.lobby.connect(socket);
        this.join(socket);
        this.on(socket);
    }

    join(socket) {
        // default join room
        socket.join('lobby');
        socket.join('chat');
        socket.join(`channel:${socket.userId}`);
        socket.join(`channel:${socket.name}`);
    }

    on(socket) {
        // register event and mapping callback function
        socket.on("login", data => this.login.bind(this)(socket, data));
        socket.on("disconnect", _ => this.disconnect.bind(this)(socket));
        socket.on("sendMsg", data => this.sendMsg.bind(this)(socket, data));
        socket.on("broadcast", data => this.broadcast.bind(this)(socket, data));
        socket.on("whisper", data => this.whisper.bind(this)(socket, data));
    }

    login(socket, data) {
        // notify all user, someone coming
        const id = socket.id;
        if (!this.lobby.isLegalFrequency(id)) {
            return this.lobby.sendIllegalMsg(id);
        }
        const name = data.name;
        socket.name = name;
        this.lobby.login(id, name);
    }

    sendMsg(socket, data) {
        const id = socket.id;
        if (!this.lobby.isLegalFrequency(id)) {
            return this.lobby.sendIllegalMsg(id);
        }

        const msg = data.msg;
        const name = data.name;
        // TODO: it can be a multiple room lobby only add parameter with 'roomId' 
        this.lobby.sendMsg(id, msg,name);
    }

    broadcast(socket, data) {
        if (!this.lobby.isLegalFrequency(id)) {
            return this.lobby.sendIllegalMsg(id);
        }
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