// Importar mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Definicion del Schema y con los parametros
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
   
  },
  password: {
    type: String,
 
  }
});

// Exportar el modelo
module.exports = mongoose.model("Usuario", usuarioSchema);
