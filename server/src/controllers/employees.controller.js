//creo un objeto con funciones a exportar
const empCtrl = {}

empCtrl.getEmployees = (req,res) => {res.send('getting employees')} // multiples
empCtrl.createEmployee = (req,res) => {res.send('creating employees')}
empCtrl.getEmployee = (req,res) => {res.send('getting employee')} //un empleado
empCtrl.updateEmployee = (req,res) => {res.send('updating employees')}
empCtrl.deleteEmployee = (req,res) => {res.send('deleating employees')}
module.exports = empCtrl