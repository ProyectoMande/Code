// Rutas que permitiran definir las 
// operaciones del servidor

const multerTrabajador = require('../libs/multer');

// Se importa express
const express = require('express');

// Objeto que permite ingresar rutas
const router = express.Router();

// COntroladores
const trabajadorCtrl = require('../controllers/trabajador.controllers');

// Establecemos que se hara en cada ruta //

// Ruta principal (/)
// req:request  res:response
router.get('/', (req, res) => {
    res.send('Hello world');
});

// Agregar ta¿rabajdor
router.post('/', multerTrabajador,trabajadorCtrl.addTrabajador);

// Ver trabajadores
router.get('/', trabajadorCtrl.getTrabajador);

// Obtener trabajador
router.get('/:celular', trabajadorCtrl.getTrabajador);

// Obtener trabajadores_labor (funcion de la bd)
router.get('/trabajadores_labor/:celularUsuario/:laborId', trabajadorCtrl.getTrabajadores_Labor);

// Obtener la solicitud pendiente del trabajdor
router.get('/solicitud/:celular', trabajadorCtrl.getSolicitud);

// Terminar solicitud
router.put('/solicitud_terminada/:id_solicitud', trabajadorCtrl.solicitudTerminada);

// Obtener las labores de un trabajador
router.get('/labores/:celular', trabajadorCtrl.getLabores);

// Se exporta el objeto router
// Es decir, cuando se importe este archivo, se importara dicho objeto
module.exports = router;