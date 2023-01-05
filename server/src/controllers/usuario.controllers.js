const db = require('../database');

const usuarioCtrl = {};

usuarioCtrl.addUsuario = async (req, res) => {
    // Datos del usuario a añadir
    const {
        celular,
        nombreCompleto,
        id,
        email,
        gps_latitud,
        gps_longitud,
        tarjeta_numero,
        tarjeta_fecha_vencimiento,
        tarjeta_cvv
     } = req.body;
    
    // Agregamos el usuario a la db
    const newUsuario = await db.query(`INSERT INTO usuario 
        (celular, nombreCompleto, id, email, gps_latitud, 
            gps_longitud, tarjeta_numero, tarjeta_fecha_vencimiento, tarjeta_cvv)
            VALUES (
                $1, $2, $3, $4, $5, $6, MD5($7), MD5($8), MD5($9)
            ) RETURNING *`, 
            [celular, nombreCompleto, id, email, gps_latitud, gps_longitud, 
            tarjeta_numero, tarjeta_fecha_vencimiento, tarjeta_cvv]);

    // Mostramos el nuevo usuario
    console.log(newUsuario.rows[0]);
};

module.exports = usuarioCtrl;