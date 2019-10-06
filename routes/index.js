const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
module.exports = () => {
  router.get("/", indexController.mostrarMenu);

  return router;
};
