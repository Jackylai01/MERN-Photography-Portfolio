const router = require("express").Router();
const upload = require("../utils/multer");
const commercial = require("../controllers/commercial");
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
  [upload.array("image", 15)],
  auth,
  authAdmin,
  commercial.uploadCommercial
);

//前端-獲取全部的圖片
router.get("/getCommercial", commercial.getPortfolio);

router.get("/", commercial.getImgId);

//刪除全部照片
router.delete(
  "/deleteCommercial",
  auth,
  authAdmin,
  commercial.deleteAllPortfolio
);

//刪除單一相片
router.post("/destroy", commercial.deleteOnePortfolio);

//新增單一照片
router.post(
  "/singleuploadCommercial",
  upload.single("image"),
  auth,
  authAdmin,
  commercial.SingleuploadPortfolio
);

// 更新單一張照片
router.put(
  "/updateCommercial/:_id",
  upload.single("image"),
  auth,
  authAdmin,
  commercial.updatePortfolio
);

module.exports = router;
