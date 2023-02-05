const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    position: {
      type: Number,
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

module.exports = mongoose.model("Portfolio", portfolioSchema);
