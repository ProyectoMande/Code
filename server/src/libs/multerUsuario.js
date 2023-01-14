const multer = require('multer');
const path = require('path');

// para recibir imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, "reciboImage.jpg");
    }
});

const multerUsuario = multer({
    storage,
    dest: path.join(__dirname, '../public/uploads')
}).single("reciboImage");

module.exports = multerUsuario;