// Importar passport
const passport = require("passport");
// Importar Mogoose
const mogoose = require("mongoose");
const Usuario = mogoose.model("Usuario");
const { validationResult } = require("express-validator");

// Autenticar el usuario
exports.autenticarUsario = passport.authenticate("local", {
  successRedirect: "/presupuestos",
  failureRedirect: "/usuario/iniciarSesion"
});

// Iniciar con el login
exports.iniciarLogin = (req, res) => {
  res.render("login", {
    nombrePagina: "Login"
  });
};

// Crear un nuevo usuario
exports.formularioNuevoUsuario = (req, res) => {
  res.render("crearUsuario", {
    nombrePagina: "Nuevo usuario"
  });
};

// Agregar un nuevo usuario a la base de datos
exports.agregarUsuario = async (req, res, next) => {
  const usuario = new Usuario(req.body);

  // Hacer la insercion de datos
  try {
    await usuario.save();
  } catch (error) {}

  res.redirec("/usuario/iniciarSesion");
};

// Verificar que el usuario  se encuentrea logueado e

exports.verificarUsuario = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // Redireccionar a login
  res.redirec("/usuario/iniciarSesion");
};
