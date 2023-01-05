//Logica de la Aplicacion
const express = require('express');
const morgan = require('morgan');

const app = express();

//creamos una "variable" para el puerto y buscamos si existe alguna en las variables de entorno 
app.set('port',process.env.PORT || 4000);

//para usar en el scrip de dev
app.use(morgan('dev'));

// para recibir json
app.use(express.json());

//cada vez que requiramos la ruta /api/trabajador  se trabajara con /routes/routes
app.use("/api/trabajador",require('./routes/trabajador.routes'));

// Rutas de usuario
app.use('/api/usuario', require('./routes/usuario.routes'));
 

//exportamos el archivo
module.exports=app;