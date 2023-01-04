const { Router } = require('express');
const router = Router();

const trabajador = require('../controllers/trabajador.controllers');

// CRUD trabajador

router.post("/trabajador", trabajador.addTrabajador);

router.get("/trabajador", trabajador.getTrabajador);

router.put("/trabajador", trabajador.updateTrabajador);

router.delete("/trabajador", trabajador.deleteTrabajador);

module.exports = router;