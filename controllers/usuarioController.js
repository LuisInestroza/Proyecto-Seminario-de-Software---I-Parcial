// Importar Mogoose
const mogoose = require("mongoose");
const Usuario = mogoose.model("Usuario");
const { validationResult } = require("express-validator");

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
