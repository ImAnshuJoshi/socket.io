const express = require("express");
const {
  updateName,
  updateProfilePicture,
  updatePassword,
} = require("../controllers/userController");
const upload = require("../utils/multerConfig");
const tokenAuth = require("../middlewares/tokenAuth");
const router = express.Router();

router.put("/updateName", tokenAuth, updateName);
router.put(
  "/updateProfilePicture",
  tokenAuth,
  upload.single("image"),
  updateProfilePicture
);
router.put("/changePassword", tokenAuth, updatePassword);

module.exports = router;
