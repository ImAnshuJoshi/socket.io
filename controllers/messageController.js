const Message = require("../models/messageModel");

exports.sendMessage = async (data) => {
  try {
    const message = new Message({
      message: data.message,
      senderId: data.senderId,
      receiverId: data.receiverId,
    });

    await message.save();
    return message;
  } catch (error) {
    throw error;
  }
};

exports.sendMessageToUser = async (req, res) => {
  try {
    const { message, senderId, receiverId } = req.body;
    const io = req.io;
    console.log("HI controller:");
    // console.log(io);
    // if (io.sockets.listeners("connection").length > 0) {
    //   console.log("io.sockets.on('connection') is set up");
    // } else {
    //   console.log("io.sockets.on('connection') is not set up");
    // }
    // io.on("connection", (socket) => {
    //   console.log("A user connected");

    //   socket.on("send_message", async (data) => {
    //     try {
    //       const message = await messageController.sendMessage(data);
    //       console.log("Message sent successfully using controller");
    //       console.log(message);
    //       io.to(data.receiverId).emit("message_sent", message);
    //     } catch (error) {
    //       console.error("Error sending message:", error);
    //     }
    //   });

    //   socket.on("disconnect", () => {
    //     console.log("A user disconnected");
    //   });
    // });
    const messageObject = {
      message,
      senderId,
      receiverId,
    };

    const savedMessage = await Message.create(messageObject);
    io.to(receiverId).emit("new_message", savedMessage);

    res.status(200).json({
      status: "success",
      message: "Message sent successfully",
      data: savedMessage,
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
