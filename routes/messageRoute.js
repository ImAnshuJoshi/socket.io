const express = require("express");
const router = express.Router();
const {
  sendMessageToUser,
  sendMessage,
} = require("../controllers/messageController");
const { attachIOToRequest } = require("../middlewares/socketMiddleware");

router.post("/send", attachIOToRequest, sendMessageToUser);

module.exports = router;
