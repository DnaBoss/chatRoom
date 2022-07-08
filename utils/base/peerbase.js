
const config = require('../../config/config.json');
class PeerBase {

    constructor(io, socketId, userId) {
        // this.service 其實就是 socket
        this.service = io.sockets.sockets.get(socketId);
        this.userId = userId;
        this.messageUpperBound = config.defaultUpperBound;
    }

    /**
     *
     * 直接對玩家發送訊息
     * @param {string} event
     * @param {*} data
     * @memberof PeerBase
     */
    sendMessage(event, data) {
        if (this.service) {
            this.service.emit(event, data)
        }
    }

    
}

module.exports = PeerBase;