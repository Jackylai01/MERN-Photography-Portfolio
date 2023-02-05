const Profile = require("../models/profile-model");
const cloudinary = require("../utils/cloudinary");

const createProfile = {
  getProfile: async (req, res) => {
    try {
      const getProfile = await Profile.find();
      res.status(200).json(getProfile);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  postProfile: async (req, res) => {
    try {
      //在使用者新增個人簡介之前，先把上一次的刪除
      await Profile.deleteMany();
      //新增新的相片到雲端資訊庫
      let result = await cloudinary.uploader.upload(req.file.path);
      let profile = new Profile({
        skill: req.body.skill,
        description: req.body.description,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      let foundProfile = await Profile.findById(req.params._id);
      //刪除雲端資料上一張個人照
      await cloudinary.uploader.destroy(foundProfile.cloudinary_id);

      let result = await cloudinary.uploader.upload(req.file.path);
      let data = {
        skill: req.body.skill || foundProfile.skill,
        description: req.body.description || foundProfile.description,
        avatar: result.secure_url || foundProfile.avatar,
        cloudinary_id: result.public_id || foundProfile.cloudinary_id,
      };

      foundProfile = await Profile.findByIdAndUpdate(req.params._id, data, {
        new: true,
      });
      res.json(foundProfile);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = createProfile;
