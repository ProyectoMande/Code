const db = require('../database');
const path = require('path');

const { getCoordenadas, getDireccion } = require('./controllers');

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

    //Comprobamos si las coordenadas se encuentran definidas o no
    if (coordenadas){
        //Se guardan las coordenadas en sus respectivas variables
        var gps_latitud = coordenadas.y;
        var gps_longitud = coordenadas.x;
    } else {
        console.log("Las coordenadas no se encuentran definidas")
        return false;
    }


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

trabajadorCtrl.getTrabajadores_Labor = async (req, res) => {
    const { celularUsuario, laborId } = req.params;

    const trabajadores_labor = await db.query(`SELECT * FROM trabajadores_labor($1, $2) AS
    (celular VARCHAR, nombreCompleto VARCHAR, promedio_calificacion numeric, precio_hora integer, distancia double precision)`,
    [laborId, celularUsuario]);
    res.send(trabajadores_labor.rows);
}

trabajadorCtrl.getSolicitud = async (req,  res) => {

    const celular_trabajador = req.params.celular

    // Se obtiene la solicitud
    const solicitud = await db.query(`
    SELECT * FROM solicitud_trabajador($1) AS
    (long double precision, lat double precision, labor_name varchar, id_solicitud integer);
    `, [celular_trabajador]);

    const solicitud_trabajador = solicitud.rows[0];

    if (solicitud_trabajador != null){
        const direccion= await getDireccion(solicitud_trabajador.long, solicitud_trabajador.lat);

        res.send({
            direccion,
            labor_name: solicitud_trabajador.labor_name,
            id_solicitud: solicitud_trabajador.id_solicitud
        })
    }
    else { res.send(null) }
    
}

trabajadorCtrl.solicitudTerminada = async (req, res) => {

    const id_solicitud = req.params.id_solicitud;

    const solicitud_terminada = await db.query(`
        UPDATE solicitud SET finalizada = TRUE WHERE id = $1 RETURNING *
    `, [id_solicitud]);

    console.log(solicitud_terminada.rows[0]);
}

trabajadorCtrl.getLabores = async (req, res) => {
    // Celular del trabajdor
    const { celular } = req.params;

    // Obtenemos las labores del trabajador
    const labores = await db.query(`
        SELECT id_labor, precio_hora, nombre FROM trabajador_labor
            INNER JOIN labor ON labor.id = trabajador_labor.id_labor
                WHERE celular_trabajador = $1
    `, [celular]);

    // Enviamos las labores
    res.send(labores.rows);
}

trabajadorCtrl.actualizarTrabajador = async (req, res) => {
    // Celular del trabajador
    const { celular } = req.params;

    // Datos nuevos
    const { email, direccion } = req.body;
    const labores = JSON.parse(req.body.laboresTrabajador);
    
    //Actualizamos los datos
    if(direccion != ""){
        const coordenadas = await getCoordenadas(direccion);

        //Comprobamos si las coordenadas se encuentran definidas o no
        if (coordenadas){
            //Se guardan las coordenadas en sus respectivas variables
            var gps_latitud = coordenadas.y;
            var gps_longitud = coordenadas.x;

            const coordenadaNueva = db.query(`
                UPDATE trabajador SET coordenada = ST_Point($1, $2) WHERE celular = $3
            `, [gps_longitud, gps_latitud, celular]);
        } else {
            console.log("Las coordenadas no se encuentran definidas")
            return false;
        }
    }

    if(email != ""){
        const emailNuevo = db.query(`
            UPDATE trabajador SET email = $1 WHERE celular = $2
        `, [email, celular]);
    }

    for(let labor of labores){
        const { id, precio_hora } = labor;
        if(labor.checked){
            if(labor.esNueva){
                const nuevaLabor = await db.query(`
                INSERT INTO trabajador_labor
                    (celular_trabajador, id_labor, precio_hora)
                        VALUES ($1, $2, $3)
                `, [celular, id, precio_hora]);
            } else {
                const laborActualizada = await db.query(`
                    UPDATE trabajador_labor SET precio_hora = $1 
                        WHERE id_labor = $2 AND celular_trabajador = $3
                `, [precio_hora, id, celular]);
            }
        } else {
            if(!labor.esNueva){
                const laborEliminada = await db.query(`
                    DELETE FROM trabajador_labor 
                        WHERE id_labor = $1 AND celular_trabajador = $2
                `, [id, celular]);
            }
        }
    }
}

module.exports = trabajadorCtrl;