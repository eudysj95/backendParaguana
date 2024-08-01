const validator = require("validator");
const User = require("../models/User");
const fs = require("fs");

const prueba = (req, res) => {
  return res.status(200).json({
    messaje: "prueba controller",
  });
};

const crear = (req, res) => {
  let parametros = req.body;

  try {
    let vNombre = !validator.isEmpty(parametros.nombre);
    let vDescripcion = !validator.isEmpty(parametros.descripcion);
    let vCategoria = !validator.isEmpty(parametros.categoria);
    let vSubCategoria = !validator.isEmpty(parametros.subCategoria);
    let vDireccion = !validator.isEmpty(parametros.direccion);
    let vTelefono = !validator.isEmpty(parametros.telefono);

    if (
      !vNombre ||
      !vDescripcion ||
      !vCategoria ||
      !vSubCategoria ||
      !vDireccion ||
      !vTelefono
    ) {
      throw new Error("No se ha validado la informacion");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  const user = new User(parametros);

  user
    .save()
    .then(() => {
      return res.status(200).json({
        status: "succes",
        message: "exito al guardar usuario",
      });
    })
    .catch(() => {
      return res.status(404).json({
        status: "error",
        message: "error al guardar usuario",
      });
    });
};

const editar = (req, res) => {
  let id = req.params.id;

  let parametros = req.body;

  try {
    let vNombre = !validator.isEmpty(parametros.nombre);
    let vDescripcion = !validator.isEmpty(parametros.descripcion);
    let vCategoria = !validator.isEmpty(parametros.categoria);
    let vSubCategoria = !validator.isEmpty(parametros.subCategoria);
    let vDireccion = !validator.isEmpty(parametros.direccion);
    let vTelefono = !validator.isEmpty(parametros.telefono);

    if (
      !vNombre ||
      !vDescripcion ||
      !vCategoria ||
      !vSubCategoria ||
      !vDireccion ||
      !vTelefono
    ) {
      throw new Error("No se ha validado la informacion");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  User.findOneAndUpdate({ _id: id }, parametros)
    .then(() => {
      return res.status(200).json({
        status: "succes",
        message: "exito al editar usuario",
      });
    })
    .catch(() => {
      return res.status(404).json({
        status: "error",
        message: "error al editar usuario",
      });
    });
};

const listar = (req, res) => {
  let consulta = User.find({})
    .then((users) => {
      return res.status(200).json({
        status: "succes",
        users,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        status: "error",
        message: "No se pudo listar",
      });
    });
};

const eliminar = (req, res) => {
  let id = req.params.id;

  User.findOneAndDelete({ _id: id })
    .then(() => {
      return res.status(200).json({
        status: "succes",
        message: "eliminado con exito",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        status: "error",
        message: "no se pudo eliminar",
      });
    });
};

const uno = (req, res) => {
  let id = req.params.id;

  User.findOne({ _id: id })
    .then((user) => {
      return res.status(200).json({
        status: "succes",
        user,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        status: "error",
        message: "no encontrado",
      });
    });
};

const subir = (req, res) => {
  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "error",
      message: "no existe el archivo",
    });
  } else {
    let nombre = req.file.originalname;
    let nombreSplit = nombre.split(".");
    let extencion = nombreSplit[1];

    if (
      extencion != "png" &&
      extencion != "jpg" &&
      extencion != "jpeg" &&
      extencion != "gif"
    ) {
      fs.unlink(req.file.path, () => {
        return res.status(400).json({
          status: "error",
          message: "archivo invalido",
        });
      });
    } else {

      let id = req.params.id;

      User.findOneAndUpdate({_id: id}, {imagen: req.file.filename}, {new: true}).then((objeto) => {
        return res.status(200).json({
          status: "succes",
          message: "subir",
          file: objeto
        });
      }).catch((error) => {
        return res.status(400).json({
          status: "error",
          message: "error al subir"
        })
      }) 
    }
  }
};

module.exports = {
  prueba,
  crear,
  editar,
  listar,
  eliminar,
  uno,
  subir,
};
