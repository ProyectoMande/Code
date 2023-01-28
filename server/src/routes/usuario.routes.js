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

// Obtener calificaciones pendientes
router.get('/calificaciones_pendientes/:celular', usuarioCtrl.getCalificacionesPendientes);

// Añadir calificacion
router.post('/calificacion_nueva', usuarioCtrl.addCalificacion);

// VErficar tarjeta
router.get('/info_tarjeta/:celular/:tarjeta_numero/:tarjeta_fecha_vencimiento/:tarjeta_cvv', usuarioCtrl.verificarTarjeta);

module.exports = router;