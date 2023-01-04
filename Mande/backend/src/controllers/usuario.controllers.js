const usuario = {};

usuario.addUsuario = (req, res) => {
    res.send("Agregar usuario");
};

usuario.getUsuario = (req, res) => {
    res.send("Obtener usuario");
};

usuario.updateUsuario = (req, res) => {
    res.send("Actualizar usuario");
};

usuario.deleteUsuario = (req, res) => {
    res.send("Eliminar usuario");
};

module.exports = usuario;