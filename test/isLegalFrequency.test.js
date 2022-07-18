
var chai = require('chai')
const expect = chai.expect;
const { WebSocket, Server } = require('mock-socket');
const Peer = require('../utils/base/peerBase');
// Baccarat adjust threshold
describe('socket request speed limiter', () => {
    afterEach(() => { });
    const fakeUrl = 'ws://localhost:8080'
    const socket = new WebSocket(fakeUrl);
    const peer = new Peer(socket);
    const action = 5;
    const seconds = 5
    peer.actionUpperBound = action;
    peer.limitMilliseconds = seconds * 1000;
    const testTime = Date.now();
    // set default action before test
    for (let i = 0; i < action - 1; i++) {
        peer.action(testTime);
    }
   
    it(`in ${seconds} seconds , no matter how short of request  period time,at lest permit ${action} time request`, () => {
        const now = testTime;
        expect(peer.isLegalFrequency(now)).be.equal(true);
    });

    it(`in ${seconds} seconds ,over then ${action} time request will be reject`, () => {
        const now = testTime + peer.limitMilliseconds - 1;
        expect(peer.isLegalFrequency(now)).be.equal(false);
    });

    it(`no matter ${action} time request before ,after idle ${seconds} seconds,user can continue request action`, () => {
        const now = testTime + peer.limitMilliseconds + 1;
        expect(peer.isLegalFrequency(now)).be.equal(true);
    });

});
