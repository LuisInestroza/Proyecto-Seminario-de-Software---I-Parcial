const mongoose = require("mongoose");

exports.mostrarMenu = (req, res) => {
  res.render("index", {
    nombrePagina: "Presupuestos"
  });
};
