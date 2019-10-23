// Importar Mongosee
const mongosee = require("mongoose");
mongosee.Promise = global.Promise;

// Definir esquema
const presuestoUsuarioSchema = new mongosee.Schema({
  presupuestoNeto: {
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

// Exportar modelo
module.exports = mongosee.model("PresupuestoUsuario", presuestoUsuarioSchema);
