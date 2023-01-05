//Logica de la Aplicacion
const express = require('express')
const morgan = require('morgan')

const app = express()

//creamos una "variable" para el puerto y buscamos si existe alguna en las variables de entorno 
app.set('port',process.env.PORT || 4000)

//para usar en el scrip de dev
app.use(morgan('dev'))

//cada vez que requiramos la ruta /api/employees  se trabajara con /routes/employees.routes
app.use("/api/employees",require('./routes/employees.routes'))
 

//exportamos el archivo
module.exports=app;