const express = require("express");
const router = express.Router();
const layoutController = require("../controllers/layoutController");
const loginController = require("../controllers/loginController");
module.exports = () => {
  router.get("/", layoutController.mostrarMenu);
  router.get("/iniciarSesion", loginController.iniciarLogin);

  return router;
};
