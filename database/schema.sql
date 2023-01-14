-- Crea database
CREATE DATABASE mande
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    TEMPLATE template0;

-- Coneccion DB mande
\c mande

-- Tabla trabajador
CREATE TABLE trabajador(
    celular VARCHAR(20) PRIMARY KEY,
    nombreCompleto VARCHAR(20) NOT NULL,
    id VARCHAR(20),
    email VARCHAR(20),
    estado VARCHAR(20),
    gps_latitud DOUBLE PRECISION NOT NULL,
    gps_longitud DOUBLE PRECISION NOT NULL,
    foto_perfil VARCHAR(100),
    img_id VARCHAR(100)
);

-- Tabla usuario
CREATE TABLE usuario(
    celular VARCHAR(20) PRIMARY KEY,
    nombreCompleto VARCHAR(20) NOT NULL,
    id VARCHAR(20),
    email VARCHAR(20),
    gps_latitud DOUBLE PRECISION NOT NULL,
    gps_longitud DOUBLE PRECISION NOT NULL,
    tarjeta_numero TEXT NOT NULL, --Encriptado MD5
    tarjeta_fecha_vencimiento TEXT NOT NULL, --Encriptado MD5
    tarjeta_cvv TEXT NOT NULL --Encriptado MD5
);

-- Tabla labor
CREATE TABLE labor(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(20)
);

-- Tabla trabajdor_labor
CREATE TABLE trabajador_labor(
    celular_trabajador VARCHAR(20) NOT NULL,
    id_labor INTEGER,
    precio_hora INTEGER,
    PRIMARY KEY(celular_trabajador, id_labor),
    CONSTRAINT fk_trabajador_trabajador_labor
        FOREIGN KEY (celular_trabajador) REFERENCES trabajador(celular),
    CONSTRAINT fk_labor_trabajador_labor
        FOREIGN KEY (id_labor) REFERENCES labor(id)
);

-- Tabla solicitud
CREATE TABLE solicitud(
    id SERIAL PRIMARY KEY,
    celular_trabajador VARCHAR(20) NOT NULL,
    celular_usuario VARCHAR(20) NOT NULL,
    descripcion VARCHAR(200),
    pago DOUBLE PRECISION NOT NULL,
    CONSTRAINT fk_trabajador_solicitud
        FOREIGN KEY (celular_trabajador) REFERENCES trabajador(celular),
    CONSTRAINT fk_usuario_solicitud
        FOREIGN KEY (celular_usuario) REFERENCES usuario(celular)
);

-- Tabla calificacion
CREATE TABLE calificacion(
    celular_usuario VARCHAR(20) NOT NULL,
    id_solicitud INTEGER NOT NULL,
    calificacion INTEGER NOT NULL,
    PRIMARY KEY(celular_usuario, id_solicitud),
    CONSTRAINT fk_usuario_calificacion
        FOREIGN KEY (celular_usuario) REFERENCES usuario(celular),
    CONSTRAINT fk_solicitud_calificacion
        FOREIGN KEY (id_solicitud) REFERENCES solicitud(id)
);