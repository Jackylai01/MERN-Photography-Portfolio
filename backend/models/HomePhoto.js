const mongoose = require("mongoose");

//輪播圖
const homePhotoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    avatar: {
      type: String,
    },

    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomePhoto", homePhotoSchema);
