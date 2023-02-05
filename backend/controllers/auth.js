const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidation } = require("../validation");
const sendMail = require("./sendMail");
const dotenv = require("dotenv");
dotenv.config();

const userCtrl = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      //檢查使用者輸入的內容、字數、資料類型是否有錯--Joi obj
      const { error } = registerValidation(req.body);
      if (error) res.status(400).send(error.details[0].message);

      //檢查信箱的格式
      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });
      //檢查資料庫是否有重複的信箱
      const emailExist = await User.findOne({ email });
      if (emailExist)
        return res.status(400).json({ msg: "信箱已經存在，請重新註冊。" });

      //使用者密碼加密(雜湊)

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        username,
        email,
        password: passwordHash,
      };

      //製作jwt
      const activation_token = createActivationToken(newUser);

      //製作信箱驗證功能
      const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url, "確認您的信箱");

      res.json({
        msg: "註冊成功。請在信箱中啟動您的註冊連結驗證。",
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      //req.body這個動作，使用者點擊這個路由時會執行
      const { activation_token } = req.body;

      //將JWT解密
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      //將使用者的資料解構出來
      const { username, email, password } = user;
      //檢查信箱是否存在
      const check = await User.findOne({ email });
      if (check) return res.status(400).json({ msg: "信箱已經存在" });

      //註冊使用者資訊存到mongodb
      const newUser = new User({
        username,
        email,
        password,
      });
      await newUser.save();
      res.json({ msg: "驗證成功。帳戶註冊成功" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "信箱或帳號有誤。" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "信箱或帳號有誤。" });

      //登入成功後建立一個token來驗證狀態
      const refresh_token = createRefreshToken({ id: user._id });

      //存入cookie，這裡使用的方式以JWT加密後，存入cookie來做驗證。另一種方案為存入session，但考量此網站的特性，故採用cookie
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "登入成功" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "cookie error" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        console.log(user);
        if (err) return res.status(400).json({ msg: "請先登入" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "信箱不存在" });
      const access_token = createAccessToken({ id: user._id });
      const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`;

      sendMail(email, url, "重設密碼");
      res.json({ msg: "重設您的密碼，請檢查您的信箱是否正確" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );
      res.json({ msg: "密碼更新成功" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-passwrod");
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: `/user/refesh_token` });
      return res.json({ msg: "刪除成功" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

//信箱格式驗證
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

//建立JWT，啟動帳號驗證
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

//建立JWT 成功的金鑰
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

//每隔 3天，JWT過期。自動建立新的JWT金鑰
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = userCtrl;
