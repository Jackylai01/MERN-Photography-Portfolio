const router = require("express").Router();
const userCtrl = require("../controllers/auth");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//中間件-測試有沒有使用者進入這個路由
router.get("/test", (req, res, next) => {
  console.log("test API", new Date().toString());
  res.send("test");
  next();
});

//register user 註冊
router.post("/register", userCtrl.register);

// //啟動帳號
router.post("/activation", userCtrl.activateEmail);

// //login 登入
router.post("/login", userCtrl.login);

//cookie 驗證狀態，傳遞成功的token
router.post("/refresh_token", userCtrl.getAccessToken);

//忘記密碼-發送重設密碼連結
router.post("/forgot", userCtrl.forgotPassword);

//重設密碼
router.post("/reset", auth, userCtrl.resetPassword);

//登入狀態可以獲得data，用於顯示在後台，如:相片、個人資料內容
router.get("/infor", auth, userCtrl.getUserInfor);

//登出
router.get("/logout", userCtrl.logout);

module.exports = router;
