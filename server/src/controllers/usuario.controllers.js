const db = require('../database');
const {getCoordenadas} = require('./controllers');

const usuarioCtrl = {};

usuarioCtrl.addUsuario = async (req, res) => {
    // Datos del usuario a añadir
    const {
        celular,
        nombreCompleto,
        id,
        email,
        direccion,
        tarjeta_numero,
        tarjeta_fecha_vencimiento,
        tarjeta_cvv
     } = req.body;

     const coordenadas = await getCoordenadas(direccion);

     //Comprobamos si las coordenadas se encuentran definidas o no
     if (coordenadas){
         //Se guardan las coordenadas en sus respectivas variables
         const gps_latitud = coordenadas.y;
         const gps_longitud = coordenadas.x;    
     } else {
         console.log("Las coordenadas no se encuentran definidas")
         return false;
     }
    
    // Agregamos el usuario a la db
    const newUsuario = await db.query(`INSERT INTO usuario 
        (celular, nombreCompleto, id, email, coordenada, tarjeta_numero, tarjeta_fecha_vencimiento, 
            tarjeta_cvv)
            VALUES (
                $1, $2, $3, $4, ST_Point($5, $6), MD5($7), MD5($8), MD5($9)
            ) RETURNING *`, 
            [celular, nombreCompleto, id, email, gps_longitud, gps_latitud, 
            tarjeta_numero, tarjeta_fecha_vencimiento, tarjeta_cvv]);

    // Mostramos el nuevo usuario
    console.log(newUsuario.rows[0]);
};

usuarioCtrl.getUsuario = async (req, res) => {
    // Celular del usuario a obtener
    const { celular } = req.params;

    // Obtenemos el usuario
    const usuario = await db.query(`
        SELECT * FROM usuario WHERE celular = $1
    `, [celular]);

    // Enviamos el Trabajador
    res.send(usuario.rows[0]);
}

usuarioCtrl.solicitarServicio = async (req, res) => {
    // datos de la solicitud
    const {
        celular_trabajador,
        id_labor,
        celular_usuario,
        descripcion,
        pago
    } = req.body

    // Insertamos la solicitud
    const solicitud = await db.query(`
        INSERT INTO solicitud (celular_trabajador, id_labor, celular_usuario, descripcion, pago)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [celular_trabajador, id_labor, celular_usuario, descripcion, pago]);

    // mostramos la solicutud b¿nueva
    console.log(solicitud.rows[0]);

}

usuarioCtrl.getCalificacionesPendientes = async (req, res) => {
    
    const { celular } = req.params;

    const calificaciones_pendientes = await db.query(`
        SELECT * FROM calificaciones_pendientes($1) AS 
            (nombre_trabajador VARCHAR, labor_name VARCHAR, solicitud_id INTEGER)
    `, [celular]);

    res.send(calificaciones_pendientes.rows);
}

usuarioCtrl.addCalificacion = async (req, res) => {

    const { celular_usuario, id_solicitud, calificacion } = req.body;

    const calificacionNueva = await db.query(`
        INSERT INTO calificacion (celular_usuario, id_solicitud, calificacion) 
            VALUES ($1, $2, $3)
    `, [celular_usuario, id_solicitud, calificacion]);
}

usuarioCtrl.verificarTarjeta = async (req, res) => {
    // Obtenemos los parametros
    const { celular, tarjeta_numero, tarjeta_fecha_vencimiento, tarjeta_cvv } = req.params;

    // Solicitamos el usuario correspondiente a los parmatros
    const tarjeta = await db.query(`
        SELECT * FROM usuario WHERE tarjeta_numero = MD5($1) 
            AND tarjeta_fecha_vencimiento = MD5($2)
                AND tarjeta_cvv = MD5($3)
                    AND celular = $4
    `, [tarjeta_numero, tarjeta_fecha_vencimiento, tarjeta_cvv, celular]);

    // Enviamos el resultado 
    res.send(tarjeta.rows[0])
}

usuarioCtrl.actualizarUsuario = async (req, res) => {
    // Obtenemos el celular del trabajdor a actualizar
    const { celular } = req.params;

    // Obtenemos los datos actualizados
    const datosActualizados = req.body;

    // Obtenemos las coordenadass de la direccion (si se cambio)
    if(datosActualizados.direccion != ""){
        const coordenadas = await getCoordenadas(datosActualizados.direccion);

        // Se guardan las coordenadas en sus respectivas variables
        const gps_latitud = coordenadas.y;
        const gps_longitud = coordenadas.x;

        // Se actualizan las coordenadas
        const nuevasCoordenadas = await db.query(`
            UPDATE usuario SET coordenada = ST_Point($1, $2) WHERE celular = $3
        `, [gps_longitud, gps_latitud, celular]);
    }

    // Actualizamos los datos que si hallan recibido cambios
    let nuevoDato;
    for(const datoActualizado in datosActualizados){
        if(datosActualizados[datoActualizado] != "" && datoActualizado != "direccion"){
            if(datoActualizado.startsWith("tarjeta")){
                nuevoDato = await db.query(`
                    UPDATE usuario SET ${datoActualizado} = MD5($1) WHERE celular = $2 RETURNING *
                `, [datosActualizados[datoActualizado], celular]);
            } else {
                nuevoDato = await db.query(`
                    UPDATE usuario SET ${datoActualizado} = $1 WHERE celular = $2 RETURNING *
                `, [datosActualizados[datoActualizado], celular]);
            }
        }
    }
    if(nuevoDato != null){
        console.log("Usuario Actualizado = ", nuevoDato.rows[0])
    }
}

module.exports = usuarioCtrl;