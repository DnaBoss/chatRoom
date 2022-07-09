const config = require('./config/config.json');
const Lobby = require('./utils/base/lobby');
const { io, server } = require('./io/server');
const lobby = Lobby.create();
const socketHandler = require('./utils/base/socketHandler').getInstance(lobby, server, io);
socketHandler.listen(config.port);
socketHandler.start();




