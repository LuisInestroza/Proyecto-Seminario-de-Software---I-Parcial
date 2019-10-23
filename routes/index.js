// Importar express
const express = require("express");
// Importar router
const router = express.Router();
// Importar expres-validador
const { check } = require("express-validator");
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
  router.post(
    "/nuevo/usuario",

    [
      // Verificar atributos
      check("nombre", "El nombre es requerido")
        .not()
        .isEmpty()
        .escape(),
      check("email", "El correo electronico es requerido")
        .not()
        .isEmpty(),
      check("email", "El correo no es valido")
        .isEmail()
        .normalizeEmail(),
      check("password", "La contraseña es requerida")
        .not()
        .isEmpty()
    ],
    usuarioController.agregarUsuario
  );

  // Login del usuario
  router.get("/usuario/iniciarSesion", usuarioController.iniciarLogin);
  router.post("/usuario/iniciarSesion", authController.autenticarUsario);

  router.get(
    "/presupuestos",
    // authController.verificarUsuario,
    presupuestoController.presupuestoUsuario
  );

  router.get(
    "/crear/presupuesto",
    // authController.verificarUsuario,
    presupuestoController.crearPresupuesto
  );

  router.get(
    "/presupuestos",
    authController.verificarUsuario,
    presupuestoController.presupuestoUsuario
  );
  return router;
};
