// Rutas que permitiran definir las 
// operaciones del servidor

// Se importa express
const express = require('express');

const multerUsuario = require('../libs/multerUsuario');

// Objeto que permite ingresar rutas
const router = express.Router();

const usuarioCtrl = require('../controllers/usuario.controllers');

// Agregar usuario
router.post('/', multerUsuario, usuarioCtrl.addUsuario);

// Obtener usuario
router.get('/:celular', usuarioCtrl.getUsuario);

// Solicitar servicio
router.post('/servicio', usuarioCtrl.solicitarServicio);

module.exports = router;