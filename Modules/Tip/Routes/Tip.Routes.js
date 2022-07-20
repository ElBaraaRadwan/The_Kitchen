const router = require("express").Router();
const { uploadRecipe } = require("../../../middlewares/Storge");

const {
  getAllTips,
  createTip,
  deleteTip,
  getMyTIPs,
  editTip,
} = require("../Controllers/Tip.Control");

router.get("/getAllTips", getAllTips);
router.get("/getAllTips/getMyTIPs/:id", getMyTIPs);
router.post("/createTip", uploadRecipe.array("attachment"), createTip);
router.patch("/editTip/:id", uploadRecipe.array("attachment"), editTip);
router.delete("/deleteTip/:id", deleteTip);

module.exports = router;
