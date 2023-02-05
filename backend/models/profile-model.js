const mongoose = require("mongoose");

//首頁-主要照片超連結
const profileSchema = new mongoose.Schema({
  skill: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
