const mongoose = require("mongoose");

const d = new Date();

const tipSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Tip must be provided"],
      maxlength: [300, "Tip Can't be More than 300 Char"],
    },
    attachment: [Object],
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    createdDate: {
      type: String,
      default: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
    },
  },
  {
    timestamps: true,
  }
);

const TIP = mongoose.model("TIP", tipSchema);

module.exports = TIP;
