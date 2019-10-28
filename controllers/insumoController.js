// inmportar mongoose
const mongoose = require("mongoose");
const Insumo = mongoose.model("Insumo");

exports.formularioCrearInsumo = (req, res) => {
  res.render("crearInsumo", {
    nombrePagina: "Nuevo Gasto"
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

// Editar insumo
exports.formularioEditarInsumo = async (req, res, next) => {
  const insumo = await Insumo.findOne({ url: req.params.url });

  // Si existe un datos
  if (!insumo) return next();

  res.render("editarInsumo", {
    nombrePagina: "Editar Insumo",
    insumo,
    cerrarSesion: true,
    nombre: req.user.nombre
  });
};

exports.editarInsumo = async (req, res, next) => {
  const editarInsumo = req.body;

  console.log(editarInsumo);

  const insumo = await Insumo.findOneAndUpdate(
    { url: req.params.url },
    editarInsumo,
    {
      new: true,
      runValidators: true
    }
  );

  res.redirect("/insumoUsuario");
};

// Elimaniar un insumo

exports.eliminarInsumo = async (req, res) => {
  const { id } = req.params;
  const insumo = await Insumo.findById(id);

  if (verificarUser(insumo, req.user)) {
    insumo.remove();
    res.status(200).send("Gasto eliminado");
  } else {
    res.status(403).send("Error al eliminar");
  }
};

const verificarUser = (insumo = {}, usuario = {}) => {
  if (!insumo.autor.equals(usuario._id)) {
    return false;
  }
  return true;
};
