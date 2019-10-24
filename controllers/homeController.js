exports.formularioMenu = (req, res) => {
  res.render("home", {
    nombrePagina: "Presupuestos",
    barra: true
  });
};
