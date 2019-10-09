// Importar express
const express = require("express");
// Importar router
const router = express.Router();
// Importar los Controller
const layoutController = require("../controllers/layoutController");
const loginController = require("../controllers/loginController");
const usuarioController = require("../controllers/usuarioController");
// Rutas
module.exports = () => {
  router.get("/", layoutController.mostrarMenu);
  router.get("/usuario/iniciarSesion", loginController.iniciarLogin);

  router.get("/nuevo/usuario", usuarioController.formularioNuevoUsuario);
  router.post("/nuevo/usuario", usuarioController.agregarUsuario);

  return router;
};
