const User = require("../model/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class AuthController {
  //[POST /register]
  registerAuth = async (req, res) => {
    const { username, password } = req.body;
    var regExp = /^[A-Za-z][\w.]+@[\w]+\.\w+$/;
    if (!regExp.test(username)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    //Kiem tra
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing username and password" });
    }
    //Kiem tra phai email khong

    try {
      const user = await User.findOne({ username: username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Missing duplicate account" });
      }
      const hashPassword = await argon2.hash(password);
      const newUser = new User({
        username: username,
        password: hashPassword,
      });
      await newUser.save();
      //return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).json({
        success: true,
        message: "Created at the faculty of conglomerate",
        accessToken,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  //[POST /login]
  loginAuth = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing username or password" });
    }

    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username" });
      }
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });
      }
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        accessToken,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  //[GET /api/auth]
  //check if user is logged in
  checkLogin = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };
}

module.exports = new AuthController();
