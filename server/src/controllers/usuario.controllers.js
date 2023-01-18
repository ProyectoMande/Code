const db = require('../database');
const getCoordenadas = require('./controllers');

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
    // coordenadas
    const gps_latitud = coordenadas.y;
    const gps_longitud = coordenadas.x;
    
    // Agregamos el usuario a la db
    const newUsuario = await db.query(`INSERT INTO usuario 
        (celular, nombreCompleto, id, email, coordenada, tarjeta_numero, tarjeta_fecha_vencimiento, 
            tarjeta_cvv)
            VALUES (
                $1, $2, $3, $4, POINT($5, $6), MD5($7), MD5($8), MD5($9)
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

module.exports = usuarioCtrl;