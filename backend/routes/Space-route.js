const router = require("express").Router();
const upload = require("../utils/multer");
const space = require("../controllers/portfolio");
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
  space.uploadPortfolio
);

//前端-獲取全部的圖片
router.get("/getSpace", space.getPortfolio);

//刪除全部照片
router.delete("/deleteSpace", auth, authAdmin, space.deleteAllPortfolio);

//刪除單一相片
router.post("/destroy", auth, authAdmin, space.deleteOnePortfolio);

//新增單一照片
router.post(
  "/singleuploadSpace ",
  upload.single("image"),
  auth,
  authAdmin,
  space.SingleuploadPortfolio
);

// 更新單一張照片
router.put(
  "/updateSpace/:_id",
  upload.single("image"),
  auth,
  authAdmin,
  space.updatePortfolio
);

module.exports = router;
