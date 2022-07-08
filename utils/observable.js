// 伺服器實作觀察介面
class Server {
    constructor() {
        this.subscribers = new Map();
        this.subscribers.set('test', new Set());
    }

    subscribe(peer, channel) {
        //頻道若不存在則建立頻道，當然也可以反過來，只讓使用者註冊已經存在的頻道
        this.existChannel(channel) ? this.createChannel(channel) : null;
        this.existPeer(peer, channel) ?
            //請自行實作失敗處理 
            console.log("訂閱失敗") :
            this.subscribers.get(channel).add(peer);
    }

    unsubscribe(peer, channel) {
        this.existChannel(channel) && this.existUser(peer, channel) ?
            this.remove(peer, channel) :
            //請自行實作失敗處理
            console.log("退訂失敗");
    }

    publish(data, channel) {
        // this.subscribers.get(channel).forEach((peer) => peer.receive(data));
    }

    existChannel(channel) {
        return this.subscribers.has(channel);
    }

    createChannel(channel) {
        this.subscribers.set(channel, new Set());
    }

    existPeer(peer, channel) {
        return this.subscribers.get(channel).has(peer);
    }
   
    remove(peer, channel) {
        this.subscribers.get(channel).delete(peer);
    }
}