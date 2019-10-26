// Importar Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Definir el esquema
const importeSchema = new mongoose.Schema({
  cantidad: {
    type: String,
    default: 0,
    trim: true
  },
  autor: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuarios",
    required: "El autor es importante"
  }
});

// Exportar el modelu
module.exports = mongoose.model("Importe", importeSchema);
