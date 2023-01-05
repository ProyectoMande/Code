const db = require('../database');

const trabajadorCtrl = {};

trabajadorCtrl.getTrabajador = (req, res) => {
    res.send('trabajador recibido');
};

trabajadorCtrl.addTrabajador = async (req, res) => {
    // Obtenemos los datos del trabajdor
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
    // Insertamos el trabajador a la bd
    const newTrabajador = await db.query(`INSERT INTO trabajador 
        (celular, nombreCompleto, id, email, estado, gps_latitud, gps_longitud,
            foto_perfil, img_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [
                celular, nombreCompleto, id, email, estado, gps_latitud, gps_longitud, foto_perfil, img_id
            ]);
    
    console.log('Nuevo Trabajador = ', newTrabajador.rows[0]);
};

trabajadorCtrl.updateTrabajador = (req, res) => {
    res.send("actualizando trabajador");
};

trabajadorCtrl.deleteTrabajador = (req, res) => {
    res.send("elimiando trabajador");
};

module.exports = trabajadorCtrl;