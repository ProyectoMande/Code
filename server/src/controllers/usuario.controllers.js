const db = require('../database');

const usuarioCtrl = {};

usuarioCtrl.addUsuario = (req, res) => {
    res.send('agregar usuario');
};

module.exports = usuarioCtrl;