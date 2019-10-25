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
  // Editar insumo
  router.get(
    "/editarInsumo",
    authController.verificarUsuario,
    insumoController.formularioEditarInsumo
  );

  router.post(
    "/editarInsumo",
    authController.verificarUsuario,
    insumoController.editarInsumo
  );

  // Eliminar insumo
  router.delete("/insumoEliminar/:id", insumoController.eliminarInsumo);
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

  // Cerrar sesion del usuario
  router.get("/cerrarSesion", authController.cerrarSesion);

  // Panel de los presupuestos del usuario
  router.get(
    "/insumoUsuario",
    authController.verificarUsuario,
    authController.formularioInsumoUsuario
  );

  // crear los insumos del usuario
  router.get(
    "/crearInsumo",
    authController.verificarUsuario,
    insumoController.formularioCrearInsumo
  );
  router.post(
    "/crearInsumo",
    authController.verificarUsuario,
    insumoController.agregarInsumo
  );

  return router;
};
