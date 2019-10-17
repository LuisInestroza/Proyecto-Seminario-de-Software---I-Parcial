// Importar express
const express = require("express");
// Importar router
const router = express.Router();
// Importar los Controller
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const usuarioController = require("../controllers/usuarioController");
const presupuestoController = require("../controllers/presupuestoController");
// Rutas
module.exports = () => {
  router.get("/", homeController.mostrarMenu);
  router.get("/usuario/iniciarSesion", loginController.iniciarLogin);

  router.get("/nuevo/usuario", usuarioController.formularioNuevoUsuario);
  router.post("/nuevo/usuario", usuarioController.agregarUsuario);
  router.get("/presupuestos", presupuestoController.presupuestoUsuario);

  return router;
};
