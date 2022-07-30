const fileSizeFormatter = require("../Utils/fileSize");

module.exports = (req) => {
  let filesArray = [];
  req.files.forEach((element) => {
    const file = {
      fileName: element.originalname,
      filePath: element.path,
      fileType: element.mimetype,
      fileSize: fileSizeFormatter(element.size, 2),
    };
    filesArray.push(file);
  });
  console.log(filesArray);
  return filesArray;
};
