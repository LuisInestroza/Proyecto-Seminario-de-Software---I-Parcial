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
const crearError = require("http-errors");

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
  res.locals.messages = req.flash();
  next();
});

app.use("/", router());

// Error 404
app.use((req, res, next) => {
  next(crearError(404, "ERROR: La página no existe"));
});

// Errores
app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.locals.status = status;
  res.status(status);

  // Mostrar la pagina
  res.render("error", {
    status,
    message: error.message
  });
});

app.listen(process.env.PORT);
