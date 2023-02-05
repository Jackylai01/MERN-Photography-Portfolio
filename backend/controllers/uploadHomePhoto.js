const cloudinary = require("../utils/cloudinary");
const HomePhoto = require("../models/HomePhoto");

const uploadHomePhoto = {
  uploadImg: async (req, res) => {
    try {
      let result = await cloudinary.uploader.upload(req.file.path);
      let data = new HomePhoto({
        title: req.body.title,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await data.save();

      res.json({ msg: "新增成功", data });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  deleteImg: async (req, res) => {
    try {
      let data = await HomePhoto.findById(req.params._id);
      await cloudinary.uploader.destroy(data.cloudinary_id);
      await data.remove();
      res.json({
        msg: "刪除成功",
        data: data,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  getImg: async (req, res) => {
    try {
      let data = await HomePhoto.find();
      if (!data) {
        return res.status(404).json({ msg: "相片不存在" });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  update: async (req, res) => {
    try {
      let data = await HomePhoto.findById(req.params._id);
      await cloudinary.uploader.destroy(data.cloudinary_id);

      let result = await cloudinary.uploader.upload(req.file.path);

      let newData = {
        title: req.body.title || data.title,
        avatar: result.secure_url || data.avatar,
        cloudinary_id: result.public_id || data.cloudinary_id,
      };

      data = await HomePhoto.findByIdAndUpdate(req.params._id, newData, {
        new: true,
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

module.exports = uploadHomePhoto;
