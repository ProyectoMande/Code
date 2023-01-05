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