const passport = require("passport");
const mongoose = require("mongoose");
const Insumo = mongoose.model("Insumo");
const Importe = mongoose.model("Importe");

// Autenticar el usuario
exports.autenticarUsario = passport.authenticate("local", {
  successRedirect: "/insumoUsuario",
  failureRedirect: "/usuario/iniciarSesion",
  failureFlash: true,
  badRequestMessage: ["Debes ingresar ambos campos"]
});

// Mostrar el panel de presupuestos del usuario
exports.formularioInsumoUsuario = async (req, res, next) => {
  const insumo = await Insumo.find({ autor: req.user._id });
  const importe = await Importe.find({ autor: req.user._id });
  if (!insumo) return next();
  if (!importe) return next();

  res.render("insumo", {
    nombrePagina: "Insumos Usuario",
    cerrarSesion: true,
    nombre: req.user.nombre,
    insumo,
    importe
  });
};

// Cerrar sesion del usuario
exports.cerrarSesion = (req, res) => {
  req.logout();
  req.flash("correcto", ["Cuenta Cerrada"]);
  return res.redirect("/usuario/iniciarSesion");
};
// Verificar que el usuario  se encuentrea logueado
exports.verificarUsuario = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // Redireccionar a login
  res.redirect("/usuario/iniciarSesion");
};
