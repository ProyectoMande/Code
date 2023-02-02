const db = require('../database');

const laborCtrl = {};

laborCtrl.getLabores = async (req, res) => {
    try {
        const labores = await db.query(
            `SELECT * FROM labor`
        );
        
        res.send(labores.rows);
    } catch (error) {
        console.log(error)
    }
};

laborCtrl.getLaboresDisponibles = async (req, res) => {
    const labores_disponibles = await db.query(
        `SELECT * FROM labores_disponibles`
    );

    res.send(labores_disponibles.rows);
}

module.exports = laborCtrl;