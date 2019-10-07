exports.iniciarLogin = (req, res) => {
  res.render("login", {
    nombrePagina: "Login"
  });
};
