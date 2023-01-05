//creo un objeto con funciones a exportar
const empCtrl = {}

const {Pool}= require('pg');

const pool = new Pool(
    {
        host: "localhost",
        user: "bucheli",
        port: 5432,
        password: "0000",
        database: "mandeDev"
    }
);

empCtrl.getEmployees = async (req,res) => {
    const response = await pool.query('SELECT * FROM employee');
    console.log(response.rows);
    //escribe las filas en el html
    res.status(200).json(response.rows)};

empCtrl.createEmployee = (req,res) => {res.send('creating employees')}
empCtrl.getEmployee = (req,res) => {res.send('getting employee')} //un empleado
empCtrl.updateEmployee = (req,res) => {res.send('updating employees')}
empCtrl.deleteEmployee = (req,res) => {res.send('deleating employees')}
module.exports = empCtrl
