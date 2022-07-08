const { io, server } = require('../../io/server');
const PeerBase = require('./peerbase');
const PeerManager = require('./peerManager');

class SocketHandler {

    /**
     * Creates an instance of SocketHandler.
     * @param {PeerManager} peerManager
     * @param {server} server
     * @memberof SocketHandler
     */
    constructor(peerManager, server, io) {
        this.peerManager = peerManager;
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
    static getInstance(peerManager, server, io) {
        return this._instance = this._instance || new SocketHandler(peerManager, server, io);
    }
    listen(port) {
        this.server.listen(port, () => {
            console.log(`app listening on port ${port} : ${new Date()}`);
        })
    }
    start() {
        io.use((socket, next) => {
            // TODO:should verify socket here
            next();
        }).on('connect', this.onConnect.bind(this));
    }

    async onConnect(socket) {
        console.log('socket.id = ', socket.id);
        const userId = socket.handshake.query.userId;
        let peer = new PeerBase(io, socket.id, userId);
        this.peerManager.addPeer(userId, peer);
        socket.join(`${userId}`, (err) => this.onJoin(err, socket));
        socket.on("disconnect", () => this.onDisconnect.bind(this)(userId))
    }

    async onJoin(err, socket) {
        if (err) {
            console.log('err = ', err);
            socket.disconnect();
            return
        }
    }

    async onDisconnect(userId) {
        try {
            this.peerManager.removePeer(userId);
        } catch (err) {

        }
    }
}
module.exports = SocketHandler;