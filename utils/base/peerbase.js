
const config = require('../../config/config.json');
class PeerBase {

    constructor(socket) {
        this.service = socket
        this.name = socket.name;
        this.userId = socket.userId;
        this.actionUpperBound = config.actionUpperBound;
        this.limitMilliseconds = config.limitMilliseconds;
        this.timestamps = [];
        this.clearTimestamps();
    }

    action() {
        this.timestamps.push(Date.now());
    }
    /**
     *
     *
     * @param {{name:string}} data
     * @memberof PeerBase
     */
    login(data) {
        this.name = data.name;
        this.service.emit('loginSuccess', data);
    }


    /**
     *
     *
     * @param {{name:string}} data
     * @memberof PeerBase
     */
    userJoin(data) {
        this.service.to('chat').emit('userJoin', data);
    }

    sendMsg(data) {
        this.service.to('chat').emit('receiveMsg', data);
    }

    sendIllegalMsg(name) {
        this.service.emit(`channel:${name}`);
    }

    sendIllegalName() {
        this.service.emit(`loginFail`);
    }

    clearTimestamps() {
        setTimeout(function () {
            let len = this.timestamps.length;
            if (Date.now() - this.timestamps[len - 1] > this.limitMilliseconds) {
                this.timestamps = [];
            }
            this.clearTimestamps();
        }.bind(this), this.limitMilliseconds)
    }

    /**
     *
     *
     * @return {boolean} 
     * @memberof PeerBase
     */
    isLegalFrequency() {
        let ret = true
        if (this.timestamps.length < this.actionUpperBound) {
            return ret;
        }
        // 確保 timestamps 的邊界 與 actionUpperBound 一致
        while (this.timestamps.length > this.actionUpperBound) {
            this.timestamps.shift();
        }

        if (this.timestamps[0] - this.timestamps[this.actionUpperBound - 1] < this.limitMilliseconds) {
            ret = false;
        }

        return ret
    }

    /**
     *
     *
     * @param {string} from
     * @param {string} sendTo
     * @param {string} msg
     * @memberof PeerBase
     */
    whisper(from, sendTo, msg) {
        const data = { from, msg }
        this.service.to(`channel:${sendTo}`).emit("whisper", data);
    }
}

module.exports = PeerBase;