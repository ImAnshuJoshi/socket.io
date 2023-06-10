const { handleSocketEvents } = require("../utils/socketEvents");
// const httpServer = require("http").createServer();
const { http } = require("../app");
const io = require("socket.io")(http);

// Start the server and handle socket events
handleSocketEvents(io);

function attachIOToRequest(req, res, next) {
  req.io = io;
  next();
}

module.exports = {
  attachIOToRequest,
};
