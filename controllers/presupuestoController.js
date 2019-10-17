exports.presupuestoUsuario = (req, res) => {
  res.render("presupuestos", {
    nombrePagina: "Presupuesto"
  });
};

exports.crearPresupuesto = (req, res) => {
  res.render("crearPresupuesto", {
    nombrePagina: "Crear Presupuesto"
  });
};
