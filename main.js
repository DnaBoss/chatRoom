const config = require('./config/config.json');
const peerManager = require('./utils/base/peerManager').getInstance();
const { io, server } = require('./io/server');
const socketHandler = require('./utils/base/socketHandler').getInstance(peerManager, server, io);
socketHandler.listen(config.port);
socketHandler.start();




