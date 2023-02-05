const mongoose = require("mongoose");

const CommercialSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Commercial", CommercialSchema);
