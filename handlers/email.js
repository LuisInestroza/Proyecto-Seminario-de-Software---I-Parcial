const emailConfig = require("../config/email");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const util = require("util");

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.password
  }
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: __dirname + "/../views/emails",
      layoutsDir: __dirname + "/../views/emails",
      defaultLayout: ""
    },
    viewPath: __dirname + "/../views/emails",
    extName: ".handlebars"
  })
);

exports.enviar = async opciones => {
  const opcionesEmail = {
    from: "Presupuestos <finance@presupuestos.com>",
    to: opciones.usuario.email,
    subject: opciones.subject,
    template: opciones.template,
    context: {
      restUrl: opciones.restUrl
    }
  };

  const sendMail = util.promisify(transport.sendMail, transport);
  return sendMail.call(transport, opcionesEmail);
};
