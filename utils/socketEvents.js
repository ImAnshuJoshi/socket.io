const messageController = require("../controllers/messageController");

let io;

exports.handleSocketEvents = async (socketIO) => {
  io = socketIO;
  console.log("Starting socket events!!!!");

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send_message", async (data) => {
      try {
        const message = await messageController.sendMessage(data);
        console.log("Message sent successfully using controller");
        console.log(message);
        io.to(data.receiverId).emit("message_sent", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  console.log("Socket event finished!!!!!");
};

exports.getIO = () => {
  return io;
};
