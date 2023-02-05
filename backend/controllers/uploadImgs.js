const cloudinary = require("../utils/cloudinary");
const { flatten, $pull } = require("mongo-dot-notation");

const SlideShowModel = require("../models/slideshow-model");
const fs = require("fs");

//cloudinary 會有非同步的問題，跟單圖上傳的寫法會不太一樣
const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      console.log(res.secure_url);
      resolve({
        res: res.secure_url,
        id: res.public_id,
      });
    });
  });
};

const uploadImages = {
  uploadSlideshow: async (req, res) => {
    try {
      const urls = [];
      const files = req.files;

      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinaryImageUploadMethod(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }

      const newPost = new SlideShowModel({
        title: req.body.title,
        avatar: urls.map((url) => url.res),
        cloudinary_id: urls.map((id) => id.id),
      });

      newPost.save();

      res.status(200).json({
        msg: "新增成功",
        data: newPost,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getSlideshow: async (req, res) => {
    try {
      let data = await SlideShowModel.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteAllSlideshow: async (req, res) => {
    try {
      let Images = await SlideShowModel.find();
      let imgId = await Images[0].cloudinary_id;
      await cloudinary.api.delete_all_resources(Images);

      if (imgId) {
        await SlideShowModel.deleteMany({
          $in: imgId,
        });
      } else {
        await Images.remove();
      }
      res.status(200).json({
        msg: "刪除成功",
        deleteData: imgId,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteOneSlideshow: async (req, res) => {
    try {
      let id = await req.body.cloudinary_id;
      let url = await req.body.avatar;
      if (!id) return res.status(400).json({ msg: "No image Selected" });
      if (!url) return res.status(400).json({ msg: "No imageUrl Selected" });

      //cloudinary 刪除照片之語法，必須是public_id 才能刪除，資料庫設定的cloudinary_id = public_id
      await cloudinary.uploader.destroy(id);
      await SlideShowModel.updateOne({
        $pull: { cloudinary_id: id, avatar: url },
      });

      let data = await SlideShowModel.findOne(req.params._id);
      let newId = await data.cloudinary_id;
      let newData = await data._id;

      if (newId.length === 0) {
        await SlideShowModel.deleteOne({
          $in: newData,
        });
      }

      res.json({ msg: "刪除成功" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  SingleuploadSlideshow: async (req, res) => {
    try {
      let result = await cloudinary.uploader.upload(req.file.path);
      let data = new SlideShowModel({
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await data.save();

      res.json({ msg: "新增成功", data });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  updateSlideshow: async (req, res) => {
    try {
      let { _id } = req.params;
      let { cloudinary_id, avatar } = req.body;
      await cloudinary.uploader.destroy(cloudinary_id);

      let result = await cloudinary.uploader.upload(req.file.path);

      await SlideShowModel.updateMany(
        { _id },
        {
          $pull: {
            cloudinary_id: cloudinary_id,
            avatar: avatar,
          },
        }
      );

      await SlideShowModel.updateOne(
        { _id },
        {
          $push: {
            cloudinary_id: result.public_id,
            avatar: result.secure_url,
          },
        }
      );

      res.status(200).json({ msg: "更新成功" });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

module.exports = uploadImages;
