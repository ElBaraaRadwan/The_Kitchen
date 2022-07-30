"use strict";
const multer = require("multer");

// TIP

const TIP = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, "uploads/TIP/IMG/");
    } else {
      cb(null, "uploads/TIP/Video/");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const TIP_filter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mkv" ||
    file.mimetype === "video/mpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Recipe

const Recipe = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    ) {
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
    file.mimetype === "image/gif" ||
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
  storage: Recipe,
  limits: {
    fileSize: 25 * 1024 * 1024 * 1024, //5MB max file(s) size
  },
  fileFilter: Recipefilter,
});

const uploadTIP = multer({
  storage: TIP,
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024, //10MB max file(s) size
  },
  fileFilter: TIP_filter,
});

module.exports = {
  uploadRecipe,
  uploadTIP,
};
