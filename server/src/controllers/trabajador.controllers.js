const db = require('../database');
const path = require('path');

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
    // Obtenemos los datos del trabajdor
    const foto_perfil = req.files.fotoPerfil[0].filename;
    const img_id = req.files.fotoId[0].filename;
    const {
        celular,
        nombreCompleto,
        id,
        email,
        estado,
        direccion
    } = req.body;

    const labores = JSON.parse(req.body.laboresTrabajador);
    
    const coordenadas = await getCoordenadas(direccion);
    // coordenadas
    const gps_latitud = coordenadas.y;
    const gps_longitud = coordenadas.x;

    // Insertamos el trabajador a la bd
    const newTrabajador = await db.query(`INSERT INTO trabajador 
        (celular, nombreCompleto, id, email, estado, coordenada,
            foto_perfil, img_id) VALUES ($1, $2, $3, $4, $5, ST_Point($6, $7), $8, $9) RETURNING *`, [
                celular, nombreCompleto, id, email, estado, gps_longitud, gps_latitud, foto_perfil, img_id
            ]);
    
    console.log('Nuevo Trabajador = ', newTrabajador.rows[0]);

    // Insertamos sus labores
    for (var labor of labores){
        const laborTrabajador = await db.query(`INSERT INTO trabajador_labor
            (celular_trabajador, id_labor, precio_hora)
            VALUES ($1, $2, $3) RETURNING *`, [celular, labor.id, labor.precio_hora]);
        console.log('Nueva laborTrabajador = ', laborTrabajador.rows[0]);
    }
};

trabajadorCtrl.updateTrabajador = (req, res) => {
    res.send("actualizando trabajador");
};

trabajadorCtrl.deleteTrabajador = (req, res) => {
    res.send("elimiando trabajador");
};

module.exports = trabajadorCtrl;