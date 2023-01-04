// Modulos
const express = require('express');
const morgan = require('morgan');

// Server
const server = express();

// Settings
server.set('port', process.env.PORT || 3000);

//Middlewares
server.use(morgan('dev'));
server.use(express.json());

// Routes
server.use('/api/mande', require('./routes/routes'));

module.exports = server;