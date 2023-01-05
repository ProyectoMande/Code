const db = require('../database');

const trabajadorCtrl = {};

trabajadorCtrl.getTrabajador = (req, res) => {
    res.send('trabajador recibido');
};

trabajadorCtrl.addTrabajador = async (req, res) => {
    const {
        celular,
        nombreCompleto,
        id,
        email,
        estado,
        gps_latitud,
        gps_longitud,
        foto_perfil,
        img_id
    } = req.body;
    
    await db.query(`INSERT INTO trabajador 
        (celular, nombreCompleto, id, email, estado, gps_latitud, gps_longitud,
            foto_perfil, img_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
                celular, nombreCompleto, id, email, estado, gps_latitud, gps_longitud, foto_perfil, img_id
            ]);
};

trabajadorCtrl.updateTrabajador = (req, res) => {
    res.send("actualizando trabajador");
};

trabajadorCtrl.deleteTrabajador = (req, res) => {
    res.send("elimiando trabajador");
};

module.exports = trabajadorCtrl;