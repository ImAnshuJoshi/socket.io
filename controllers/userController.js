const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinaryConfig");
dotenv.config();

const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

exports.updateName = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    user.name = name;
    await user.save();

    res.status(200).json({
      status: "success",
      user,
      message: "Email updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    const image = await cloudinary.uploader.upload(req.file.path);
    user.image = image.secure_url;
    user.cloudinary_id = image.public_id;
    await user.save();

    res.status(200).json({
      status: "success",
      user,
      message: "Profile picture updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid current password",
      });
    }
    const isValidPassword = validatePassword(newPassword);
    if (!isValidPassword) {
      return res.status(400).json({
        status: "fail",
        message:
          "Please provide a strong password with a minimum of 8 characters, including at least 1 letter, 1 number, and 1 special symbol.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    await user.save();

    res.status(200).json({
      status: "success",
      user,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
