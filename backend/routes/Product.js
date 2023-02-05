const router = require("express").Router();
const upload = require("../utils/multer");
const product = require("../controllers/portfolio");
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
  [upload.array("file", 30)],
  auth,
  authAdmin,
  product.uploadPortfolio
);

//前端-獲取全部的圖片
router.get("/getProduct", product.getPortfolio);

//刪除全部照片
router.delete("/deleteProduct", product.deleteAllPortfolio);

//刪除單一相片
router.post("/destroy", product.deleteOnePortfolio);

//新增單一照片
router.post(
  "/singleuploadProduct ",
  upload.single("image"),

  product.SingleuploadPortfolio
);

// 更新單一張照片
router.put(
  "/updateProduct/:_id",
  upload.single("image"),
  auth,
  authAdmin,
  product.updatePortfolio
);

module.exports = router;
