const router = require("express").Router();
const upload = require("../utils/multer");
const HomePhoto = require("../controllers/uploadHomePhoto");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//中間件-測試有沒有使用者進入這個路由
router.get("/test", (req, res, next) => {
  console.log("Test Profile API", new Date().toString());
  res.send("test");
  next();
});

//前端-獲取全部的圖片
router.get("/getHomePhoto", HomePhoto.getImg);

//刪除單張相片
router.delete("/deleteHomePhoto/:_id", auth, authAdmin, HomePhoto.deleteImg);

//新增單一照片
router.post(
  "/newPostHomePhoto",
  upload.single("image"),
  // auth,
  // authAdmin,
  HomePhoto.uploadImg
);

//更新單張相片

router.put(
  "/updateHomePhoto/:_id",
  upload.single("image"),
  auth,
  authAdmin,
  HomePhoto.update
);

module.exports = router;
