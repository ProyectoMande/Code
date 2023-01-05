// Rutas que permitiran definir las 
// operaciones del servidor

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
router.post('/trabajador', trabajadorCtrl.addTrabajador);

// Ver trabajadores
router.get('/trabajador', trabajadorCtrl.getTrabajador);

// Eliminar trabajador
router.delete('/trabajador/:celular', trabajadorCtrl.deleteTrabajador);

// Actualizar trabajador
router.put('/trabajador/:celular', trabajadorCtrl.updateTrabajador);

// Se exporta el objeto router
// Es decir, cuando se importe este archivo, se importara dicho objeto
module.exports = router;