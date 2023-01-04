const trabajador = {};

trabajador.addTrabajador = (req, res) => {
    res.send("Agregar trabajador");
};

trabajador.getTrabajador = (req, res) => {
    res.send("Obtener trabajador");
};

trabajador.updateTrabajador = (req, res) => {
    res.send("Actualizar trabajador");
};

trabajador.deleteTrabajador = (req, res) => {
    res.send("Eliminar trabajador");
};

module.exports = trabajador;