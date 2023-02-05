const mongoose = require("mongoose");

//空間攝影
const SpaceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    avatar: [
      {
        type: String,
      },
    ],

    cloudinary_id: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Space", SpaceSchema);
