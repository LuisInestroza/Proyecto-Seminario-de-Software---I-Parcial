const express = require("express");
const router = express.Router();
const layoutController = require("../controllers/layoutController");
module.exports = () => {
  router.get("/", layoutController.mostrarMenu);

  return router;
};
