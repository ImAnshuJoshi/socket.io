const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    minlength: [6, "A  name must have more or equal then 6 characters"],
    maxlength: [40, "A  name must have less or equal then 40 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  cloudinaryId: String,
  image: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
