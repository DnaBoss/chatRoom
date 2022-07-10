const PeerBase = require('./peerbase');

class PeerManager {
    /**
     * Creates an instance of PeerManager.
     * @param {*} io
     * @memberof PeerManager
     */
    constructor(io) {
        this.peers = {};
        this._instance;
        this.socketLength = 0;
        this.io = io;
    }

    /**
     *
     *
     * @static
     * @returns {PeerManager}
     * @memberof PeerManager
     */
    static getInstance(io) {
        return this._instance = this._instance || new PeerManager(io);
    }

    /**
     *
     *
     * @param {string} name
     * @memberof PeerManager
     */
    isExistPeer(name) {
        return Object.keys(this.peers).some(key => this.peers[key].name == name);
    }
    /**
     *
     *
     * @param {number} socketId 
     * @param {PeerBase} peer
     * @returns {PeerBase}
     * @memberof PeerBase
     */
    addPeer(socketId, peer) {
        // 直接覆蓋
        this.peers[socketId] = peer;
        this.socketLength++;
        return peer;
    }

    /**
     *
     *
     * @param {number} socketId
     * @returns {boolean}
     * @memberof PlayerManager
     */
    removePeer(socketId) {
        if (this.peers[socketId]) {
            delete this.peers[socketId];
            this.socketLength--
        }
        return socketId in this.peers;
    }

    /**
     *
     *
     * @param {number} socketId
     * @returns {PeerBase}
     * @memberof PlayerManager
     */
    getPeer(socketId) {
        return this.peers[socketId];
    }

    /**
     *
     *
     * @param {{name:string}} data
     * @memberof PeerManager
     */
    userJoin(data) {
        data.userCount = Object.keys(this.peers).length;
        this.io.to('chat').emit('userJoin', data);
    }

    /**
     *
     *
     * @param {{from:string,msg:string}} data
     * @memberof PeerManager
     */
    sendMsg(data) {
        this.io.to('chat').emit('receiveMsg', data);
    }
}

module.exports = PeerManager;