const PeerBase = require('./peerBase');

class PeerManager {

    constructor(io) {
        this.socketDict = {};
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
    static getInstance() {
        return this._instance = this._instance || new PeerManager();
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
        this.socketDict[socketId] = peer;
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
        if (this.socketDict[socketId]) {
            delete this.socketDict[socketId];
            this.socketLength--
        }
        return socketId in this.socketDict;
    }

    /**
     *
     *
     * @param {number} socketId
     * @returns {PeerBase}
     * @memberof PlayerManager
     */
    getPeer(socketId) {
        return this.socketDict[socketId];
    }


}

module.exports = PeerManager;