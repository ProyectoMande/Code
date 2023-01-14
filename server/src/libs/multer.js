const multer = require('multer');
const path = require('path');

// para recibir imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const multerTrabajador = multer({
    storage,
    dest: path.join(__dirname, '../public/uploads')
}).fields([{name: 'fotoPerfil', maxCount: 1}, {name: 'fotoId', maxCount: 1}]);

module.exports = multerTrabajador;