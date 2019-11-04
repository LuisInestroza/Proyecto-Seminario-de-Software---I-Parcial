const passport = require("passport");
const mongoose = require("mongoose");
const Insumo = mongoose.model("Insumo");
const Importe = mongoose.model("Importe");
const Usuario = mongoose.model("Usuario");
const crypto = require("crypto");
const enviarEmail = require("../handlers/email");

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

// Mostrar el formulario de restablecer contraseña
exports.formularioCambiarPassword = (req, res) => {
  res.render("restablecerPassword", {
    nombrePagina: "Restabler tu contraseña"
  });
};

exports.enviarPeticion = async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.body.email });

  // Validar que el usuario existe
  if (!usuario) {
    req.flash("error", ["El correo electrónico no existe"]);
    return res.redirect("/restablecerPassword");
  }

  // Si el usuario existe
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expire = Date.now() + 3600000;

  // Guardar cambios
  await usuario.save();

  // Url
  const restUrl = `http://${req.headers.host}/restablecerPassword/${usuario.token}`;

  // Enviar notificacion
  await enviarEmail.enviar({
    usuario,
    subject: "Reestablecer tu contraseña",
    template: "resetearPassword",
    restUrl
  });

  // Redireccionar
  req.flash("correcto", ["Verifica tu correo electronico"]);

  res.redirect("/usuario/iniciarSesion");
};

// Mostrar el formulario de cambiar la contraseña
exports.formularioNuevaPassword = async (req, res) => {
  const usuario = await Usuario.findOne({
    token: req.params.token,
    expire: { $gt: Date.now() }
  });

  if (!usuario) {
    req.flash("error", ["Solicutud Expirada, vuelve a solicitar"]);
    return res.redirect("/restablecerPassword");
  }

  res.render("nuevaPassword", {
    nombrePagina: "Nueva Contraseña"
  });
};

// Guardar la nueva contraseña
exports.almacenarNuevaPassword = async (req, res) => {
  const usuario = await Usuario.findOne({
    token: req.params.token,
    expire: { $gt: Date.now() }
  });

  // Si no existe el usuario
  if (!usuario) {
    req.flash("error", ["Solicutud Expirada, vuelve a solicitar"]);
    return res.redirect("/restablecerPassword");
  }

  // Nueva constraseña
  usuario.password = req.body.password;
  // Limpiar valores
  usuario.token = undefined;
  usuario.expire = undefined;

  // Guardar valores
  await usuario.save();

  // Redireccionar los campos
  req.flash("correcto", "Contraseña modificada");
  res.redirect("/usuario/iniciarSesion");
};
