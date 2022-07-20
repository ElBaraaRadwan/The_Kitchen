"use strict";
const multer = require("multer");

// FAQ

const FAQs = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, "uploads/FAQs/IMG/");
    } else {
      cb(null, "uploads/FAQs/Video/");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const FAQ_filter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mkv" ||
    file.mimetype === "video/mpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadFAQs = multer({
  storage: FAQs,
  limits: {
    fileSize: 50 * 1024 * 1024 * 1024, //50MB max file(s) size
  },
  fileFilter: FAQ_filter,
});

// Recipe

const Recipe = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, "uploads/Recipe/IMG/");
    } else {
      cb(null, "uploads/Recipe/Video/");
    }
  },
  filename: (req, file, cb) => {
    console.log({ file });
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const Recipefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mkv" ||
    file.mimetype === "video/mpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadRecipe = multer({
  storage: ticket,
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, //5MB max file(s) size
  },
  fileFilter: Recipefilter,
});

module.exports = { uploadRecipe, uploadFAQs };
