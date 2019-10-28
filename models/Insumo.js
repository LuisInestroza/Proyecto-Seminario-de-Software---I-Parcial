// Importar Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definir el Schema y los parametros de los presupuestos
const insumoSchema = new mongoose.Schema({
  total: {
    type: String,
    default: 0,
    trim: true
  },
  fecha: {
    type: String,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },

  autor: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuarios",
    required: "El autor es importante"
  }
});

// Exportar el modelo
module.exports = mongoose.model("Insumo", insumoSchema);
