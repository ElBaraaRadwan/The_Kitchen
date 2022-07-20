const path = require("path");
const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) =>
  res
    .status(StatusCodes.NOT_FOUND)
    .sendFile(path.join(__dirname, "../public", "404.html"));

module.exports = notFound;
