const express = require("express");
const connectDB = require("./DB/DB");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

//passport config
require("./Modules/Users/Controllers/Strategies").googleStrategy(passport);
require("./Modules/Users/Controllers/Strategies").facebookStrategy(passport);

connectDB();

// Method Override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// bodyParser
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set Global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//Static file
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const recipesRoutes = require("./Modules/Recipe/Routes/Recipe.Routes");
const TIP_Routes = require('./Modules/Tip/Routes/Tip.Routes')
const usersRoutes = require('./Modules/Users/Routes/User.Routes')

app.use(recipesRoutes);
app.use(TIP_Routes);
app.use(usersRoutes);

// must be below the routes so the routes can work
const notFound = require("./Middlewares/notFound");
const errorHandler = require("./Middlewares/errorHandler");

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB();
    app.listen(port, () => {
      console.log(
        `Server running In ${process.env.NODE_ENV}, At => http://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;