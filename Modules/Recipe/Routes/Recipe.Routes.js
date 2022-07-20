const router = require("express").Router();
const { uploadRecipe } = require("../../../middlewares/Storge");

const {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  getMyTickts,
  editRecipe,
} = require("../controllers/Recipe.Control");

router.get("/getAllRecipe", getAllRecipes);
router.get("/getAllRecipe/myRecipe/:id", getMyTickts);
router.post("/createRecipe", uploadRecipe.array("attachment"), createRecipe);
router.patch("/editRecipe/:id", uploadRecipe.array("attachment"), editRecipe);
router.delete("/deleteRecipe/:id", deleteRecipe);

module.exports = router;