const { io } = require("../../io/server");
const PeerBase = require("./peerBase");
const PeerManager = require('./peerManager');

class Lobby {
    /**
     * Creates an instance of ChatRoom.
     * @param {PeerManager} peerManager
     * @memberof Lobby
     */
    constructor(peerManager, io) {
        this.peerManager = peerManager;
        this.io = io;
    }

    static create() {
        return new Lobby(PeerManager.getInstance(), io);
    }
    /**
     *
     *
     * @param {*} socket
     * @memberof Lobby
     */
    connect(socket) {
        const peer = new PeerBase(socket);
        this.peerManager.addPeer(socket.id, peer);
    }

    /**
     *
     *
     * @param {string} socketId
     * @memberof Lobby
     */
    disconnect(socketId) {
        this.peerManager.removePeer(socketId)
    }

    /**
     *
     *
     * @param {string} socketId
     * @return {boolean} 
     * @memberof Lobby
     */
    isLegalFrequency(socketId) {
        const peer = this.peerManager.getPeer(socketId);
        peer.action();
        return peer.isLegalFrequency();
    }

    /**
     *
     *
     * @param {string} socketId
     * @param {string} name
     * @memberof Lobby
     */
    login(socketId, name) {
        const peer = this.peerManager.getPeer(socketId);
        const data = { msg: name };
        peer.login(data)
    }

    /**
     *
     *
     * @param {string} socketId
     * @param {string} from
     * @param {string} msg
     * @memberof Lobby
     */
    chat(socketId, from, msg) {
        const peer = this.peerManager.getPeer(socketId);
        const data = { from, msg };
        peer.chat(data);
    }

    /**
     *
     *
     * @param {string} socketId
     * @memberof Lobby
     */
    sendIllegalMsg(socketId) {
        const peer = this.peerManager.getPeer(socketId);
        peer.sendIllegalMsg(peer.userId);
    }

    broadcast() {
        // TODO:待實作
    }

    /**
     *
     * @param {string} socketId
     * @param {string} from
     * @param {string} sendTo
     * @param {string} msg
     * @memberof Lobby
     */
    whisper(socketId, from, sendTo, msg) {
        const peer = this.peerManager.getPeer(socketId);
        peer.whisper(from, sendTo, msg)
    }

}

module.exports = Lobby;