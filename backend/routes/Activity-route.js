const router = require("express").Router();
const upload = require("../utils/multer");
const activity = require("../controllers/activity");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//中間件-測試有沒有使用者進入這個路由
router.get("/test", (req, res, next) => {
  console.log("Test Profile API", new Date().toString());
  res.send("test");
  next();
});

//多圖上傳
router.post(
  "/newPost",
  [upload.array("file", 15)],
  auth,
  authAdmin,
  activity.uploadPortfolio
);

//前端-獲取全部的圖片
router.get("/getActivity", activity.getPortfolio);

//刪除全部照片
router.delete("/deleteActivity", auth, authAdmin, activity.deleteAllPortfolio);

//刪除單一相片
router.post("/destroy", auth, authAdmin, activity.deleteOnePortfolio);

//新增單一照片
router.post(
  "/singleuploadActivity ",
  upload.single("image"),
  auth,
  authAdmin,
  activity.SingleuploadPortfolio
);

// 更新單一張照片
router.put(
  "/updateActivity/:_id",
  upload.single("image"),
  auth,
  authAdmin,
  activity.updatePortfolio
);

module.exports = router;
