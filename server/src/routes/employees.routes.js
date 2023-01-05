//objeto para guardar dentro URL
const {Router} = require('express')
const router = Router()

//traemos la respuesta como una constante
const empCtrl =require('../controllers/employees.controller.js')

//cuando queremos entrar a la ruta respondemos con una funcion del objeto empCtrl
router.get('/',empCtrl.getEmployees)
router.post('/',empCtrl.createEmployee) //enviar informacion
router.get('/:id',empCtrl.getEmployee) //en el navegador http://localhost:4000/api/employees/:id
router.put('/:id',empCtrl.updateEmployee) //actualizar
router.delete('/:id',empCtrl.deleteEmployee) //borrar


module.exports = router