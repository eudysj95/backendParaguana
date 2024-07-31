const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user");

router.get("/prueba", Controller.prueba);
router.post("/crear", Controller.crear);
router.put("/editar/:id", Controller.editar);
router.get("/listar", Controller.listar);

module.exports = router;