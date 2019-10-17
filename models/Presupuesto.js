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
    type: Float64Array,
    trim: true
  }
});
