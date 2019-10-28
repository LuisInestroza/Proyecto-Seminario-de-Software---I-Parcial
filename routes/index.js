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
const importeController = require("../controllers/importeController");

// Rutas
module.exports = () => {
  // Menu princial
  router.get("/", homeController.formularioMenu);

  // Panel de los presupuestos del usuario
  router.get(
    "/insumoUsuario",
    authController.verificarUsuario,
    authController.formularioInsumoUsuario
  );

  router.get(
    "/editarInsumo/:url",
    authController.verificarUsuario,
    insumoController.formularioEditarInsumo
  );

  router.post(
    "/editarInsumo/:url",
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

  // Crear el presupuesto del usuario
  router.get(
    "/crearImporte",
    authController.verificarUsuario,
    importeController.formularioCrearImporte
  );

  router.post(
    "/crearImporte",
    authController.verificarUsuario,
    importeController.crearImporte
  );

  // Editar el prepuesto
  router.get(
    "/editarPresupuesto",
    authController.verificarUsuario,
    importeController.formularioEditarImporte
  );

  router.post(
    "/editarPresupuesto",
    authController.verificarUsuario,
    importeController.editarImporte
  );
  return router;
};
