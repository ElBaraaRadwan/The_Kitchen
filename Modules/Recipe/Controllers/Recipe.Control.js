const User = require("../../Users/Schema/User.Schema");
const Recipe = require("../Schema/Recipe.Schema");
const asyncWrapper = require("../../../middlewares/async");
const { StatusCodes } = require("http-status-codes");
const fileSizeFormatter = require("../../../utils/fileSize");
const {
  sendRecipeConfirmation,
  sendRecipeAssgin,
  sendRecipeSolution,
  sendRecipeUpdation,
} = require("../../../utils/Mails");

module.exports = {

  getAllRecipes: asyncWrapper(async (req, res) => {
    const recipes = await Recipe.find({}, {}, { sort: { _id: -1 } }).exec();
    res.status(StatusCodes.OK).json({ recipes });
  }),

  // Func that find Recipes that been created by a user
  getMyTickts: asyncWrapper(async (req, res) => {
    const { id: userID } = req.params;
  
    let userRecipes = await Recipe.find(
      { user: userID },
      {},
      { sort: { _id: -1 } }
    );
  
    if (!userRecipes) {
      throw new NotFoundError(`No Recipe with user_id ${userRecipes}`);
    }
    res.status(StatusCodes.OK).json({ userRecipes, count: userRecipes.length });
  }),

  // this function for creating a Recipe  =>
  createRecipe: async (req, res, next) => {
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
  
      const { title, description, steps, categories, ingredients, timeToCock, userID } = req.body;
      const recipe = await Recipe.create({
        title,
        description,
        department,
        steps,
        categories,
        ingredients,
        timeToCock,
        user: userID,
        attachment: filesArray,
      });
  
      let userRecipes = await Recipe.find({ user: userID });
  
      const sendRecipe = await User.findOneAndUpdate(
        { _id: userID },
        {
          createdRecipes: [...userRecipes],
        },
        {
          new: true,
          runValidators: true,
        }
      );
  
      res.status(StatusCodes.CREATED).json(recipe);
      //sendRecipeConfirmation(User.name, User.email, req.body._id);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  },

  deleteRecipe: asyncWrapper(async (req, res) => {
    const { id: RecipeID } = req.params;
    const recipe = await Recipe.findOneAndDelete({ _id: RecipeID });
    if (!recipe) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(`No Recipe with id : ${RecipeID}`);
    }
    res.status(StatusCodes.OK).json({ recipe });
  }),

  editRecipe: async (req, res) => {
    const allowedUpdates = [
      "title",
      "description",
      "steps",
      "categories",
      "ingredients",
      "timeToCock",
      "attachment",
    ];
    const keys = Object.keys(req.body);
    const isUpdationValid = keys.every((key) => allowedUpdates.includes(key));
    if (!isUpdationValid)
      res.status(StatusCodes.BAD_REQUEST).json(`You can only Edit ${allowedUpdates}`);
    try {
      const { id: RecipeID } = req.params;
  
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
  
      const recipe = await Recipe.findOneAndUpdate(
        {
          _id: RecipeID,
        },
        {
          title: req.body.title,
          description: req.body.description,
          steps: req.body.steps,
          categories: req.body.categories,
          ingredients: req.body.ingredients,
          timeToCock: req.body.timeToCock,
          attachment: filesArray,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!Recipe)
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(`No Recipe with id : ${RecipeID}`);
      res.status(StatusCodes.OK).json(recipe);
      //sendRecipeSolution(User.name, User.email, req.body._id);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  },
};
