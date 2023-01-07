const db = require('../database');

const getCoordenadas = require('./controllers');

const trabajadorCtrl = {};

trabajadorCtrl.getTrabajador = async (req, res) => {
    // Celular del trabajador a obtener
    const { celular } = req.params;

    // Obtenemos el trabajador
    const trabajador = await db.query(`
        SELECT * FROM trabajador WHERE celular = $1
    `, [celular]);

    // Enviamos el Trabajador
    res.send(trabajador.rows[0]);
};

trabajadorCtrl.addTrabajador = async (req, res) => {
    console.log(req.body);
    /*
    // Obtenemos los datos del trabajdor
    const {
        celular,
        nombreCompleto,
        id,
        email,
        estado,
        direccion,
        foto_perfil,
        img_id
    } = req.body;

    
    const coordenadas = await getCoordenadas(direccion);
    // coordenadas
    const gps_latitud = coordenadas.y;
    const gps_longitud = coordenadas.x;

    // Insertamos el trabajador a la bd
    const newTrabajador = await db.query(`INSERT INTO trabajador 
        (celular, nombreCompleto, id, email, estado, gps_latitud, gps_longitud,
            foto_perfil, img_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [
                celular, nombreCompleto, id, email, estado, gps_latitud, gps_longitud, foto_perfil, img_id
            ]);
    
    console.log('Nuevo Trabajador = ', newTrabajador.rows[0]);*/
};

trabajadorCtrl.updateTrabajador = (req, res) => {
    res.send("actualizando trabajador");
};

trabajadorCtrl.deleteTrabajador = (req, res) => {
    res.send("elimiando trabajador");
};

module.exports = trabajadorCtrl;