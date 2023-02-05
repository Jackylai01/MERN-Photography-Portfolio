const router = require("express").Router();
const createProfile = require("../controllers/createProfile");
const upload = require("../utils/multer");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//中間件-測試有沒有使用者進入這個路由
router.get("/test", (req, res, next) => {
  console.log("Test Profile API", new Date().toString());
  res.send("test");
  next();
});

//後台-發布個人簡介資訊
router.post(
  "/create",
  upload.single("image"),
  auth,
  authAdmin,
  createProfile.postProfile
);

//前端-獲取現況個人簡介資訊
router.get("/getProfile", createProfile.getProfile);

//後台-更新使用者個人簡介
router.put(
  "/updateProfile/:_id",
  upload.single("image"),
  auth,
  authAdmin,
  createProfile.updateProfile
);

module.exports = router;
