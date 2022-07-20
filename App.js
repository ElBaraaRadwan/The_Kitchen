const express = require("express");
const connectDB = require("./Config/connect");
require("dotenv").config();
const app = express();

//passport config
require("./config/passport")(passport);

connectDB();

// Method Override
const methodOverride = require("method-override")

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
   let method = req.body._method
    delete req.body._method
    return method
  }
}))

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// bodyParser
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use("public/uploads", express.static(path.join(__dirname, "uploads")));


//session
const session = require('express-session');

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//passport middleware
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

//set Global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

//Static file
app.use(express.static(path.join(__dirname, "public")));

// must be below the routes so the routes can work
const notFound = require("./Middlewares/notFound");
const errorHandler = require("./Middlewares/errorHandler");

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

  app.listen(
    port,
    console.log(`Server running In ${process.env.NODE_ENV}, At => http://localhost:${port}`)
  );