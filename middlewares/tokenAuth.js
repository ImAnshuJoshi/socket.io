const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.redirect("/");
    }
    console.log(token);
    jwt.verify(token, process.env.JWT, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: "fail",
          message: "You are not authenticated",
        });
      } else {
        console.log(decoded);
        req.userEmail = decoded.email;
        req.userid = decoded.id;
      }
    });
    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
