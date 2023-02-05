const mongoose = require("mongoose");

//輪播圖
const FashionlSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Fashionl", FashionlSchema);
