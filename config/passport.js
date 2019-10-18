const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      const usuario = await Usuario.findOne({ email });
      console.log(usuario);

      // Si el usuario existe
      if (!usuario) {
        return done(null, false, {
          message: ["El correo electronico no es valido"]
        });
      }

      // El usuario existe, verificar si la contraseña es correcta
      const verificarPassword = usuario.compararPassword(password);
      if (!verificarPassword) {
        return done(null, false, {
          message: ["La constraseña ingresada es incorrecta"]
        });
      }
      return done(null, usuario);
    }
  )
);

passport.serializeUser((usuario, done) => done(null, usuario._id));

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuario.findById(id).exec();
  return done(null, usuario);
});

module.exports = passport;
