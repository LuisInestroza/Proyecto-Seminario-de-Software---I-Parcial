const mongoose = require("mongoose");
const Importe = mongoose.model("Importe");

exports.formularioCrearImporte = (req, res) => {
  res.render("crearImporte", {
    nombrePagina: "Importe"
  });
};

exports.crearImporte = async (req, res, next) => {
  const importe = new Importe(req.body);
  importe.autor = req.user._id;
  const nuevoImporte = await importe.save();
  console.log(nuevoImporte);

  req.flash("correcto", ["Importe Agregado"]);
  res.redirect("/insumoUsuario");
};
