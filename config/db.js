// Importar Mongoose
const mongoose = require("mongoose");
// Importar el archivo variables.env para la conexion
require("dotenv").config({ path: "variables.env" });

// Configuración de la conexion de Mongoose
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", error => {
  console.log(error);
});

// Importar modelos
require("../models/Usuario");
require("../models/Insumo");
require("../models/Importe");
