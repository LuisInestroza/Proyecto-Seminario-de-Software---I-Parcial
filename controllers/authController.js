const passport = require("passport");
const mongoose = require("mongoose");
const Presupuesto = mongoose.model("Presupuesto");

// Autenticar el usuario
exports.autenticarUsario = passport.authenticate("local", {
  successRedirect: "/presupuestos",
  failureRedirect: "/usuario/iniciarSesion",
  failureFlash: true,
  badRequestMessage: ["Debes ingresar ambos campos"]
});

// Verificar que el usuario  se encuentrea logueado e

exports.verificarUsuario = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // Redireccionar a login
  res.redirec("/usuario/iniciarSesion");
};
