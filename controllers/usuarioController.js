// Importar Mogoose
const mogoose = require("mongoose");
const Usuario = mogoose.model("Usuario");

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
exports.agregarUsuario = async (req, res) => {
  const usuario = new Usuario(req.body);
  const nuevoUsuario = await usuario.save();
  console.log(usuario);

  res.redirec("/nuevo/usuario");
};
