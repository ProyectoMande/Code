const db = require('../database');

const laborCtrl = {};

laborCtrl.getLabores = async (req, res) => {
    const labores = await db.query(
        `SELECT * FROM labor`
    );
    
    res.send(labores.rows);
};

module.exports = laborCtrl;