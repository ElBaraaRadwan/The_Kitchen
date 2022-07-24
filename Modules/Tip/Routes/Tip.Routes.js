const router = require("express").Router();
const { uploadTIP } = require("../../../Middlewares/Storge");

const {
  getAllTips,
  createTip,
  deleteTip,
  getMyTIPs,
  editTip,
} = require("../Controllers/Tip.Control");

router.get("/getAllTips", getAllTips);
router.get("/getAllTips/getMyTIPs/:id", getMyTIPs);
router.post("/createTip", uploadTIP.array("attachment"), createTip);
router.patch("/editTip/:id", uploadTIP.array("attachment"), editTip);
router.delete("/deleteTip/:id", deleteTip);

module.exports = router;
