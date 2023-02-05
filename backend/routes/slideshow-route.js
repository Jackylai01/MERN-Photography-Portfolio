const router = require("express").Router();
const upload = require("../utils/multer");
const slideshow = require("../controllers/uploadImgs");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//中間件-測試有沒有使用者進入這個路由
router.get("/test", (req, res, next) => {
  console.log("Test Profile API", new Date().toString());
  res.send("test");
  next();
});

//輪播圖-多圖上傳
router.post(
  "/newPost",
  [upload.array("file", 15)],
  auth,
  authAdmin,
  slideshow.uploadSlideshow
);

//前端-獲取全部的圖片
router.get("/getSlideshow", slideshow.getSlideshow);

//刪除全部照片
router.delete(
  "/deleteSlideshow",
  auth,
  authAdmin,
  slideshow.deleteAllSlideshow
);

//刪除單一相片
router.post("/destroy", auth, authAdmin, slideshow.deleteOneSlideshow);

//新增單一照片
router.post(
  "/singleuploadSlideshow",
  upload.single("image"),
  auth,
  authAdmin,
  slideshow.SingleuploadSlideshow
);

router.put(
  "/updataSlideshow/:_id",
  upload.single("image"),
  auth,
  authAdmin,
  slideshow.updateSlideshow
);

module.exports = router;
