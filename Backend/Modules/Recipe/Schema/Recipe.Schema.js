const mongoose = require("mongoose");

const d = new Date();

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be provided"],
      maxlength: [30, "Title Can't be More than 30 Char"],
    },
    description: {
      type: String,
      required: [true, "Decription must be provided"],
      maxlength: [1000, "Description Can't be More than 1000 Char"],
    },
    steps: { type: [String], required: [true, "Steps must be provided"] },
    categories: {
      type: String,
      required: [true, "Categories must be provided"],
      enum: ["Breakfast", "Lunch", "Diner"],
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients must be provided"],
    },
    timeToCock: {
      type: String,
      required: [true, "Time To Cock must be provided"],
    },
    attachment: [Object],
    likes: {
      type: mongoose.Schema.Types.ObjectId,
    },
    tips: {
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

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;