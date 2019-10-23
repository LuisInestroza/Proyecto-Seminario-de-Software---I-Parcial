// Importar express
const express = require("express");
// Importar router
const router = express.Router();
// Importar expres-validador
const { check } = require("express-validator");
// Importar los Controller
const homeController = require("../controllers/homeController");
const usuarioController = require("../controllers/usuarioController");
const insumoController = require("../controllers/insumoController");
const authController = require("../controllers/authController");
// Rutas
module.exports = () => {
  // Menu princial
  router.get("/", homeController.formularioMenu);

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
  router.get("/usuario/iniciarSesion", usuarioController.formularioLogin);
  router.post("/usuario/iniciarSesion", authController.autenticarUsario);

  router.get("/insumoUsuario", insumoController.formularioInsumoUsuario);
  router.get(
    "/crearInsumo",
    // authController.verificarUsuario,
    insumoController.formularioCrearInsumo
  );

  router.post("/crearInsumo", insumoController.agregarInsumo);
  return router;
};
