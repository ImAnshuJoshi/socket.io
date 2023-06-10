const morgan = require("morgan");
const express = require("express");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const cookieParser = require("cookie-parser");
const socketIO = require("socket.io");
const app = express();

const http = require("http").Server(app);
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

module.exports = { app, http };
