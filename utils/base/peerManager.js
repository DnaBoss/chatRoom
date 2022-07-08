const PeerBase = require('./peerbase');

class PeerManager {

    constructor() {
        this.socketDict = {};
        this._instance;
        this.socketLength = 0;
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
     * @param {number} userId 
     * @param {PeerBase} peer
     * @returns {PeerBase}
     * @memberof PeerBase
     */
    addPeer(userId, peer) {
        // 直接覆蓋
        this.socketDict[userId] = peer;
        this.socketLength++;
        return peer;
    }

    /**
     *
     *
     * @param {number} userId
     * @returns {boolean}
     * @memberof PlayerManager
     */
    removePeer(userId) {
        if (this.socketDict[userId]) {
            delete this.socketDict[userId];
            this.socketLength++;
        }
        return userId in this.socketDict;
    }

    /**
     *
     *
     * @param {number} userId
     * @returns {PeerBase}
     * @memberof PlayerManager
     */
    getPeer(userId) {
        return this.socketDict[userId];
    }

    /**
     *
     *
     * @param {number} roomId
     * @param {{ msg: string }} data
     * @memberof PeerManager
     */
    sendToRoom(roomId, data) {
        
    }
}

module.exports = PeerManager;