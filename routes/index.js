// Importar express
const express = require("express");
// Importar router
const router = express.Router();
// Importar los Controller
const homeController = require("../controllers/homeController");
const usuarioController = require("../controllers/usuarioController");
const presupuestoController = require("../controllers/presupuestoController");
// Rutas
module.exports = () => {
  // Menu princial
  router.get("/", homeController.mostrarMenu);

  // Login del usuario
  router.get("/usuario/iniciarSesion", usuarioController.iniciarLogin);
  router.post("/usuario/iniciarSesion", usuarioController.autenticarUsario);
  // Agregar nuevo usuario
  router.get("/nuevo/usuario", usuarioController.formularioNuevoUsuario);
  router.post("/nuevo/usuario", usuarioController.agregarUsuario);

  router.get(
    "/presupuestos",
    usuarioController.verificarUsuario,
    presupuestoController.presupuestoUsuario
  );

  router.get(
    "/crear/presupuesto",
    usuarioController.verificarUsuario,
    presupuestoController.crearPresupuesto
  );

  router.get(
    "/presupuestos",
    usuarioController.verificarUsuario,
    presupuestoController.presupuestoUsuario
  );
  return router;
};
