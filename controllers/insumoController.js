// inmportar mongoose
const mongoose = require("mongoose");
const Insumo = mongoose.model("Insumo");

exports.formularioCrearInsumo = (req, res) => {
  res.render("crearInsumo", {
    nombrePagina: "Crear Presupuesto"
  });
};

exports.agregarInsumo = async (req, res, next) => {
  const insumo = new Insumo(req.body);
  insumo.autor = req.user._id;
  const nuevoInsumo = await insumo.save();
  console.log(nuevoInsumo);

  req.flash("correcto", ["Insumo Agregado"]);
  res.redirect("/insumoUsuario");
};
