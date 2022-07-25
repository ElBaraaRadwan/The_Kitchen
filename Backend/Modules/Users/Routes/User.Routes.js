const passport = require("passport");
const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../../../Middlewares/Auth");
const asyncWrapper = require("../../../Middlewares/async");
const RECIPE = require("../../Recipe/Schema/Recipe.Schema");

// @DESC Google Auth GET req
router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

// @DESC Facebook Auth GET req
app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email" }));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

// @DESC LOGOUT & LOGIN FUNC
router.get("/login", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// // @DESC Dashboard FUNC
// router.get(
//   "/dashboard",
//   ensureAuth,
//   asyncWrapper(async (req, res) => {
//     const recipes = await RECIPE.find({ userID: req.user.id }).lean();
//     res.render("dashboard", {
//       username: req.user.username,
//       recipes,
//     });
//   })
// );

module.exports = router;
