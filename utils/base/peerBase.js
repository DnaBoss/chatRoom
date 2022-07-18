
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

    /**
     *
     * add one legal request record
     * @param {number} now
     * @memberof PeerBase
     */
    action(now) {
        this.timestamps.push(now);
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
    isLegalFrequency(now) {
        if (this.timestamps.length < this.actionUpperBound) {
            this.action(now);
            return true;
        }
        // ensure the first request in limit time
        if (now - this.timestamps[0] < this.limitMilliseconds) {
            return false;
        }

        this.action(now);
        // let new request timestamp replace oldest request timestamp
        while (this.timestamps.length > this.actionUpperBound) {
            this.timestamps.shift();
        }
        return true;
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