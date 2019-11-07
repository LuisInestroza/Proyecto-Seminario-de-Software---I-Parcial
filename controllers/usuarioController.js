// Importar Mogoose
const mogoose = require("mongoose");
const Usuario = mogoose.model("Usuario");
const { validationResult } = require("express-validator");
const multer = require("multer");
const shortid = require("shortid");

// Iniciar con el login
exports.formularioLogin = (req, res) => {
  res.render("login", {
    nombrePagina: "Login"
  });
};

// Crear un nuevo usuario
exports.formularioNuevoUsuario = (req, res) => {
  res.render("crearUsuario", {
    nombrePagina: "Nuevo usuario"
  });
};

// Agregar un nuevo usuario a la base de datos
exports.agregarUsuario = async (req, res, next) => {
  const errores = validationResult(req);
  const erroresArray = [];

  if (!errores.isEmpty()) {
    errores.array().map(error => erroresArray.push(error.msg));

    // Enviar los datos
    req.flash("error", erroresArray);
    res.render("crearUsuario", {
      nombrePagina: "Nuevo usuario",
      messages: req.flash()
    });
    return;
  }

  const usuario = new Usuario(req.body);

  // Hacer la insercion de datos
  try {
    await usuario.save();
    req.flash("correcto", ["Cuenta Resgistrada"]);
    res.redirect("/usuario/iniciarSesion");
  } catch (error) {
    erroresArray.push(error);
    req.flash("error", erroresArray);
  }
};

// Editar perfil
exports.formularioEditarPerfil = (req, res) => {
  res.render("editarPerfil", {
    nombrePagina: "Editar Perfil",
    usuario: req.user,
    cerrarSesion: true,
    nombre: req.user.nombre
  });
};

exports.editarPerfil = async (req, res) => {
  const usuario = await Usuario.findById(req.user._id);

  // Actualizar valores
  usuario.nombre = req.body.nombre;
  usuario.email = req.body.email;

  if (req.body.password) {
    usuario.password = req.body.password;
  }

  // Subir imagen
  if (req.file) {
    usuario.imagen = req.file.filename;
  }

  // Guardar cambios
  await usuario.save();
  req.flash("correcto", ["Perfil Actualizado"]);

  // Redireccionar
  res.redirect("/insumoUsuario");
};

// Subir la imagen
// Subir una imagen al servidor
exports.subirImagen = (req, res, next) => {
  upload(req, res, function(error) {
    if (error) {
      // Errores de multer
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          req.flash("error", ["El imagen es grande. Máximo 200Kb"]);
        } else {
          req.flash("error", [error.message]);
        }
      } else {
        // Errores del usuario
        req.flash("error", [error.message]);
      }
      // Redireccionar
      res.redirect("/insumoUsuario");
      return;
    } else {
      return next();
    }
  });
};

// Opciones de configuracion de Multer
const configuracionMulter = {
  // Tamaño máximo del archivo en bytes
  limits: {
    fileSize: 200000
  },
  // Dónde se almacena la imagen
  storage: (fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, __dirname + "../../public/uploads/perfiles");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  })),
  // Verificar que es una imagen válida mediante el mimetype
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      // El callback se ejecuta como true or false
      // se retorna true cuando se acepta la imagen
      cb(null, true);
    } else {
      cb(new Error("Formato de archivo no válido. Solo JPEG o PNG."), false);
    }
  }
};

const upload = multer(configuracionMulter).single("imagen");
