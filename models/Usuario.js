// Importar mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bcrypt = require("bcryptjs");

// Definicion del Schema y con los parametros
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

// Metodo para hast
usuarioSchema.pre("save", function(next) {
  const user = this;
  // Si el password ya fue modificado
  if (!user.isModified("password")) {
    return next();
  }

  // Generar el salt y hashear el password
  bcrypt.genSalt(10, (err, salt) => {
    // Si hay un error no continuar
    if (err) return next(err);

    // Hacer el hast
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// Comparar el password
usuarioSchema.methods.compararPassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};
usuarioSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  }).catch();
};

// Exportar el modelo
module.exports = mongoose.model("Usuario", usuarioSchema);
