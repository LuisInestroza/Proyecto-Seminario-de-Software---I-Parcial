// Importar Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Definir el Schema y los parametros de los presupuestos
const presupuestoSchema = new mongoose.Schema({
  movimiento: {
    type: String,
    trim: true
  },
  total: {
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

// Exportar el modelo
module.exports = mongoose.model("Presupuesto", presupuestoSchema);
