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
    foto_perfil BYTEA,
    img_id BYTEA
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