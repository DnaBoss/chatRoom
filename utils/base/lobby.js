const { io } = require("../../io/server");
const PeerBase = require("./peerBase");
const PeerManager = require('./peerManager');

class Lobby {
    /**
     * Creates an instance of ChatRoom.
     * @param {PeerManager} peerManager
     * @memberof Lobby
     */
    constructor(peerManager) {
        this.peerManager = peerManager;
    }

    static create() {
        return new Lobby(PeerManager.getInstance(io));
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
        let now = Date.now();
        return peer.isLegalFrequency(now);
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
        if (this.peerManager.isExistPeer(name)) {
            return peer.sendIllegalName();
        }
        const data = { name, id: socketId };
        peer.login(data)
        this.peerManager.userJoin(data);
    }

    /**
     *
     *
     * @param {string} socketId
     * @param {string} from
     * @param {string} msg
     * @memberof Lobby
     */
    sendMsg(socketId, msg) {
        const peer = this.peerManager.getPeer(socketId);
        const data = { id: socketId, from: peer.name, msg };
        this.peerManager.sendMsg(data);
    }

    /**
     *
     *
     * @param {string} socketId
     * @memberof Lobby
     */
    sendIllegalMsg(socketId) {
        const peer = this.peerManager.getPeer(socketId);
        peer.sendIllegalMsg(peer.name);
    }

    broadcast() {
        // TODO:need implement
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