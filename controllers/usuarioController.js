// Importar Mogoose
const mogoose = require("mongoose");
const Usuario = mogoose.model("Usuario");
const { validationResult } = require("express-validator");

// Iniciar con el login
exports.formularioLogin = (req, res) => {
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
  const errores = validationResult(req);
  const erroresArray = [];

  if (!errores.isEmpty()) {
    errores.array().map(error => erroresArray.push(error.msg));

    // Enviar los datos
    req.flash("error", erroresArray);
    res.render("crearUsuario", {
      nombrePagina: "Nuevo usuario",
      messages: req.flash()
    });
    return;
  }

  const usuario = new Usuario(req.body);

  // Hacer la insercion de datos
  try {
    await usuario.save();
    req.flash("correcto", ["Cuenta Resgistrada"]);
    res.redirect("/usuario/iniciarSesion");
  } catch (error) {
    erroresArray.push(error);
    req.flash("error", erroresArray);

    // // Renderizar
    // res.render("crearUsuario", {
    //   nombrePagina: "Nuevo usuario",
    //   messages: req.flash()
    // });
  }
};
