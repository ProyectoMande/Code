-- ######################## SCHEMA ################## --

-- Tabla trabajador
CREATE TABLE trabajador(
    celular VARCHAR(20) PRIMARY KEY,
    nombreCompleto VARCHAR(20) NOT NULL,
    id VARCHAR(20),
    email VARCHAR(20),
    estado VARCHAR(20),
    -- gps_latitud DOUBLE PRECISION NOT NULL,
    -- gps_longitud DOUBLE PRECISION NOT NULL,
    coordenada GEOMETRY NOT NULL,
    foto_perfil VARCHAR(100),
    img_id VARCHAR(100)
);

-- Tabla usuario
CREATE TABLE usuario(
    celular VARCHAR(20) PRIMARY KEY,
    nombreCompleto VARCHAR(20) NOT NULL,
    id VARCHAR(20),
    email VARCHAR(20),
    -- gps_latitud DOUBLE PRECISION NOT NULL,
    -- gps_longitud DOUBLE PRECISION NOT NULL,
    coordenada GEOMETRY NOT NULL,
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
    -- Nuevo atributo
    id_labor INTEGER NOT NULL,
    celular_usuario VARCHAR(20) NOT NULL,
    descripcion VARCHAR(200),
    pago DOUBLE PRECISION NOT NULL,
    -- Nuevo atributo
    finalizada BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_trabajador_solicitud
        FOREIGN KEY (celular_trabajador) REFERENCES trabajador(celular),
    CONSTRAINT fk_usuario_solicitud
        FOREIGN KEY (celular_usuario) REFERENCES usuario(celular),
    CONSTRAINT fk_labor_solicitud
        FOREIGN KEY (id_labor) REFERENCES labor(id)
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


-- ################# VISTAS ################# --

-- Obtener Labores Disponibles (Con Trabajadores Disponibles)
CREATE VIEW labores_disponibles AS
SELECT id_labor, n_labor FROM (SELECT nombre AS n_labor, id AS id_labor FROM labor  
        INNER JOIN trabajador_labor
            ON labor.id = trabajador_labor.id_labor) AS Labores
                INNER JOIN trabajador ON trabajador.estado = 'disponible';

-- Calidicacion promedio de cada trabajdor
CREATE VIEW calificacion_promedio_trabajador AS
    SELECT celular_trabajador, AVG(calificacion) AS promedio_calificacion 
        FROM solicitud INNER JOIN calificacion
            ON solicitud.id = calificacion.id_solicitud
                GROUP BY celular_trabajador;


-- ################### FUNCIONES ############ --

-- fUNCION QUE RETORNA LA INFO DE LOS TRABAJDORES (disponibles) DE UNA LABOR
CREATE OR REPLACE FUNCTION trabajadores_labor(labor_id INTEGER, celular_u VARCHAR)
RETURNS SETOF "record" AS
$$
DECLARE r record;
BEGIN
    FOR r IN SELECT celular, nombreCompleto, COALESCE(promedio_calificacion, 0.0), precio_hora, ST_DistanceSphere(coor_t,coor_u) AS distancia FROM
        (SELECT celular, nombreCompleto, promedio_calificacion, coor_t, precio_hora FROM
            (SELECT celular, nombreCompleto, promedio_calificacion, coordenada AS coor_t 
                FROM calificacion_promedio_trabajador
                            RIGHT JOIN trabajador
                                ON trabajador.celular = calificacion_promedio_trabajador.celular_trabajador
                                    AND trabajador.estado = 'disponible') AS info_trabajador
                                        NATURAL JOIN 
                                            (SELECT precio_hora FROM trabajador_labor
                                                WHERE id_labor = labor_id) AS precios_hora) AS t_info
                                                    INNER JOIN (SELECT coordenada AS coor_u FROM usuario 
                                                            WHERE celular = celular_u) AS usuario_info ON true
                                                                ORDER BY precio_hora, promedio_calificacion, distancia
        LOOP
            RETURN NEXT r;
        END LOOP;
    RETURN;
END;
$$
LANGUAGE plpgsql;
-- Esta funcion se puede extraer en varias vistas o funciones para mejorar su lectura
-- Para llamar se hace asi:
--  select * from trabajadores_labor(1) AS
--      (celular VARCHAR, nombreCompleto VARCHAR, promedio_calificacion numeric, precio_hora integer, distancia double precision);

-- Funcion trigger que cambia el estado de un trabajador a ocupado si se le hace una solicitud
CREATE FUNCTION solicitud_insert_trigger() 
RETURNS TRIGGER AS
$$
BEGIN
    UPDATE trabajador SET estado = 'ocupado' WHERE celular = NEW.celular_trabajador;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- ############# TRIGGERS ################ --

-- Trigger que ejecuta la funcion solicitud_insert_trigger()
CREATE TRIGGER solicitud_trigger AFTER INSERT ON solicitud
FOR EACH ROW EXECUTE PROCEDURE solicitud_insert_trigger();
