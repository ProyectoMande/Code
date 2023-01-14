// Se importa express
const express = require('express');

// Objeto que permite ingresar rutas
const router = express.Router();

const laborCtrl = require('../controllers/labor.controllers');

// Obteneer las labores
router.get('/', laborCtrl.getLabores);

module.exports = router;