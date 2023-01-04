const { Router } = require('express');
const router = Router();

const trabajador = require('../controllers/trabajador.controllers');
const usuario = require('../controllers/usuario.controllers');

// CRUD trabajador

router.post("/trabajador", trabajador.addTrabajador);

router.get("/trabajador", trabajador.getTrabajador);

router.put("/trabajador", trabajador.updateTrabajador);

router.delete("/trabajador", trabajador.deleteTrabajador);

// CRUD usuario

router.post("/usuario", usuario.addUsuario);

router.get("/usuario", usuario.getUsuario);

router.put("/usuario", usuario.updateUsuario);

router.delete("/usuario", usuario.deleteUsuario);

module.exports = router;