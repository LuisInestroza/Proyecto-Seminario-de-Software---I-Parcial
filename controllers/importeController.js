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

  req.flash("correcto", ["Importe Agregado"]);
  res.redirect("/insumoUsuario");
};

exports.formularioEditarImporte = async (req, res, next) => {
  const importe = await Importe.findOne({ autor: req.user._id });
  if (!importe) return next();

  res.render("editarImporte", {
    nombrePagina: "Editar Prepuesto",
    importe,
    cerrarSesion: true,
    nombre: req.user.nombre
  });
};

exports.editarImporte = async (req, res, next) => {
  const editarImporte = req.body;
  const importe = await Importe.findOneAndUpdate(
    { autor: req.user._id },
    editarImporte,
    {
      new: true,
      runValidators: true
    }
  );

  // Riderccionar
  res.redirect("/insumoUsuario");
};
