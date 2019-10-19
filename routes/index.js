// Importar express
const express = require("express");
// Importar router
const router = express.Router();
// Importar los Controller
const homeController = require("../controllers/homeController");
const usuarioController = require("../controllers/usuarioController");
const presupuestoController = require("../controllers/presupuestoController");
const authController = require("../controllers/authController");
// Rutas
module.exports = () => {
  // Menu princial
  router.get("/", homeController.mostrarMenu);

  // Agregar nuevo usuario
  router.get("/nuevo/usuario", usuarioController.formularioNuevoUsuario);
  router.post("/nuevo/usuario", usuarioController.agregarUsuario);

  // Login del usuario
  router.get("/usuario/iniciarSesion", usuarioController.iniciarLogin);
  router.post("/usuario/iniciarSesion", authController.autenticarUsario);

  router.get(
    "/presupuestos",
    authController.verificarUsuario,
    presupuestoController.presupuestoUsuario
  );

  router.get(
    "/crear/presupuesto",
    authController.verificarUsuario,
    presupuestoController.crearPresupuesto
  );

  router.get(
    "/presupuestos",
    authController.verificarUsuario,
    presupuestoController.presupuestoUsuario
  );
  return router;
};
