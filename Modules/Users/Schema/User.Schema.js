const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true },
    first_name: {
      type: String,
      required: [true, "First name must be provided"],
      maxlength: [20, "First name Can't be More than 20 Char"],
    },
    last_name: {
      type: String,
      required: [true, "Last name must be provided"],
      maxlength: [20, "Last name Can't be More than 20 Char"],
    },
    avatar: [Object],
    password: {
      type: String,
      required: [true, "Password must be provided"],
      minlength: [8, "Last name Can't be Less than 8 Char"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email address is required"],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ["Active", "In-hold", "Not-Active"],
      default: "Not-Active",
    },
    favRecipes: {
      type: mongoose.Schema.Types.ObjectId,
    },
    createdTips: {
      type: mongoose.Schema.Types.ObjectId,
    },
    createdRecipes: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const USER = mongoose.model("USER", userSchema);

module.exports = USER;
