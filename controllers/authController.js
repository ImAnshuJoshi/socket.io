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

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log(req.body);
    if (!req.body.image) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide a profile image",
      });
    }

    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User with the same email already exists",
      });
    } else {
      const isValidPassword = validatePassword(req.body.password);
      if (!isValidPassword) {
        return res.status(400).json({
          status: "fail",
          message:
            "Please provide a strong password with a minimum of 8 characters, including at least 1 letter, 1 number, and 1 special symbol.",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const image = await cloudinary.uploader.upload(req.file.path);
      console.log(image);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        image: image.secure_url,
        cloudinary_id: image.public_id,
      });
      console.log(newUser);
      await newUser.save();
      let token = "";
      if (newUser) {
        token = jwt.sign({ id: newUser._id }, process.env.JWT);
        res.cookie("token", token);
      }
      res.status(200).json({
        status: "success",
        user: newUser,
        message: "User has been signed in!",
        token: token,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "fail",
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, isAdmin, ...otherDetails } = user._doc;

    res.cookie("token", token);
    res.status(200).json({
      status: "success",
      message: "User has been logged in!",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
