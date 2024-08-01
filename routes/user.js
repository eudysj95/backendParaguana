const express = require("express");
const router = express.Router();
const multer = require("multer");

const Controller = require("../controllers/user");

const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/users/');
    },

    filename: function(req, file, cb) {
        cb(null, "user" + Date.now() + file.originalname);
    }
})

const subidas = multer({storage: almacenamiento});

router.get("/prueba", Controller.prueba);
router.post("/crear", Controller.crear);
router.put("/editar/:id", Controller.editar);
router.get("/listar", Controller.listar);
router.delete("/eliminar/:id", Controller.eliminar);
router.get("/uno/:id", Controller.uno);
router.post("/subir/:id", [subidas.single("file0")], Controller.subir);

module.exports = router;