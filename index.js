const mongoose = require("mongoose");
require("./config/db");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const router = require("./routes/index");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("./config/passport");

require("dotenv").config({ path: "variables.env" });

const app = express();

// Habilitar Body-parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "layout",
    helpers: require("./helpers/handlebars")
  })
);

app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParse());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Implementar Passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas de los mensaje
app.use(flash());

// Middleware de los mensajes
app.use((req, res, next) => {
  res.locals.messages = flash.messages;
  next();
});

app.use("/", router());

app.listen(process.env.PORT);
