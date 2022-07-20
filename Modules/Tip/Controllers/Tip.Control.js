const User = require("../../Users/Schema/User.Schema");
const TIP = require("../Schema/Tip.Schema");
const asyncWrapper = require("../../../middlewares/async");
const { StatusCodes } = require("http-status-codes");
const fileSizeFormatter = require("../../../utils/fileSize");
const {
  sendTipConfirmation,
  sendTipAssgin,
  sendTipSolution,
  sendTipUpdation,
} = require("../../../utils/Mails");

module.exports = {
  // --> Get Req For All TIPs
  getAllTips: asyncWrapper(async (req, res) => {
    const tips = await TIP.find({}, {}, { sort: { _id: -1 } }).exec();
    res.status(StatusCodes.OK).json({ tips });
  }),

  getMyTIPs: asyncWrapper(async (req, res) => {
    const { id: userID } = req.params;
  
    let userTips = await TIP.find(
      { user: userID },
      {},
      { sort: { _id: -1 } }
    );
  
    if (!userTips) {
      throw new NotFoundError(`No Tip with user_id ${userTips}`);
    }
    res.status(StatusCodes.OK).json({ userTips, count: userTips.length });
  }),

  // --> Post Req For Creating A TIP
  createTip: async (req, res, next) => {
    try {
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
  
      const { content, userID } = req.body;
      const {id: recipeID} = req.params;
      const tip = await TIP.create({
        content,
        user: userID,
        recipe: recipeID,
        attachment: filesArray,
      });
  
      let userTips = await TIP.find({ user: userID });
  
      const sendTip = await User.findOneAndUpdate(
        { _id: userID },
        {
          createdTips: [...userTips],
        },
        {
          new: true,
          runValidators: true,
        }
      );
  
      res.status(StatusCodes.CREATED).json(tip);
      //sendTipConfirmation(User.name, User.email, req.body._id);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  },

  // --> Delete Req For TIP
  deleteTip: asyncWrapper(async (req, res) => {
    const { id: TipID } = req.params;
    const tip = await TIP.findOneAndDelete({ _id: TipID });
    if (!tip) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(`No Tip with id : ${TipID}`);
    }
    res.status(StatusCodes.OK).json({ tip });
  }),

  // --> Patch Req For TIP
  editTip: async (req, res) => {
    const allowedUpdates = [
      "content",
      "attachment",
    ];
    const keys = Object.keys(req.body);
    const isUpdationValid = keys.every((key) => allowedUpdates.includes(key));
    if (!isUpdationValid)
      res.status(StatusCodes.BAD_REQUEST).json(`You can only Edit ${allowedUpdates}`);
    try {
      const { id: TipID } = req.params;
  
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
  
      const tip = await TIP.findOneAndUpdate(
        {
          _id: TipID,
        },
        {
          content: req.body.content,
          attachment: filesArray,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!tip)
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(`No Tip with id : ${TipID}`);
      res.status(StatusCodes.OK).json(tip);
      //sendTipSolution(User.name, User.email, req.body._id);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  },
};
