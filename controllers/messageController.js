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
