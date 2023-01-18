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

-- LABORES PREDIFINIDAS --
INSERT INTO labor (nombre) VALUES 
    ('aseador'),
    ('plomero'),
    ('cerrajero');

-- Obtener Labores Disponibles (Con Trabajadores Disponibles)
CREATE VIEW labores_disponibles AS
SELECT id_labor, n_labor FROM (SELECT nombre AS n_labor, id AS id_labor FROM labor  
        INNER JOIN trabajador_labor
            ON labor.id = trabajador_labor.id_labor) AS Labores
                INNER JOIN trabajador ON trabajador.estado = 'disponible';


-- fUNCION QUE RETORNA LA INFO DE LOS TRABAJDORES (disponibles) DE UNA LABOR
CREATE OR REPLACE FUNCTION trabajadores_labor(labor_id INTEGER)
RETURNS SETOF "record" AS
$$
DECLARE r record;
BEGIN
    FOR r IN SELECT celular_trabajador, promedio_calificaion, gps_latitud, gps_longitud, precio_hora FROM
    (SELECT celular_trabajador, promedio_calificaion, gps_latitud, gps_longitud FROM
        (SELECT celular_trabajador, AVG(calificacion) AS promedio_calificaion FROM solicitud
            INNER JOIN calificacion
                ON solicitud.id = calificacion.id_solicitud
                    GROUP BY celular_trabajador) AS calificacion
                        INNER JOIN trabajador
                            ON trabajador.celular = calificacion.celular_trabajador
                                AND trabajador.estado = 'disponible')
                                AS info_trabajador
                                    NATURAL JOIN 
                                        (SELECT precio_hora FROM trabajador_labor
                                            WHERE id_labor = labor_id) AS precios_hora
                                                ORDER BY precio_hora, promedio_calificaion
        LOOP
            RETURN NEXT r;
        END LOOP;
    RETURN;
END;
$$
LANGUAGE plpgsql;
-- Esta funcion se puede extraer en varias vistas o funciones para mejorar su lectura
-- FALTA LA DISTANCIA
-- Para llamar se hace asi:
--  select * from trabajadores_labor(1) AS
--      (celular_trabajador VARCHAR, avg DOUBLE PRECISION, gps_latitud DOUBLE PRECISION, gps_longitud DOUBLE PRECISION, precio_hora INTEGER);


-- Funcion que retornar las distancia entre dos coordenadas
-- ES NECESARIO POSTGIS
CREATE OR REPLACE FUNCTION distancia_coordenadas
    (lon_t DOUBLE PRECISION, lat_t DOUBLE PRECISION, 
    lon_u DOUBLE PRECISION, lat_u DOUBLE PRECISION) 
RETURNS DOUBLE PRECISION AS
$$
BEGIN
    RETURN ST_DistanceSphere(ST_MakePoint(lon_t, lat_t),ST_MakePoint(lon_u, lat_u));
END;
$$
LANGUAGE plpgsql;