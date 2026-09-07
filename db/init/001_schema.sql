-- Learning Session Exposome Framework — esquema inicial
-- Se ejecuta automáticamente la primera vez que arranca el volumen de Postgres

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE estudiante (
    id              SERIAL PRIMARY KEY,
    codigo          TEXT UNIQUE,
    idioma          TEXT NOT NULL DEFAULT 'es',
    creado_en       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE encuesta_basal (
    id              BIGSERIAL PRIMARY KEY,
    codigo          TEXT NOT NULL REFERENCES estudiante(codigo),
    edad            INT,
    genero          TEXT,
    condicion_termorregulacion TEXT,
    horas_sueno     TEXT,
    calidad_sueno   TEXT,
    frecuencia_cafeina TEXT,
    sensibilidad_termica TEXT,
    factores_ubicacion TEXT[],
    nivel_atencion  TEXT,
    respondido_en   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE horario_academico (
    aula            TEXT NOT NULL,
    dia_semana      SMALLINT NOT NULL,
    hora_inicio     TIME NOT NULL,
    hora_fin        TIME NOT NULL,
    materia         TEXT NOT NULL,
    PRIMARY KEY (aula, dia_semana, hora_inicio)
);

CREATE TABLE sesion (
    id              BIGSERIAL PRIMARY KEY,
    aula            TEXT NOT NULL,
    fecha           DATE NOT NULL,
    hora_inicio_real TIMESTAMPTZ,
    hora_fin_real   TIMESTAMPTZ,
    docente         TEXT NOT NULL,
    materia         TEXT,
    tipo_sesion     TEXT,
    estructura_descanso TEXT,
    num_estudiantes INT,
    asistencia_tipica TEXT,
    minutos_desde_anterior INT,
    incidencias     TEXT
);

CREATE TABLE encuesta_entrada (
    id              BIGSERIAL PRIMARY KEY,
    sesion_id       BIGINT NOT NULL REFERENCES sesion(id),
    codigo          TEXT NOT NULL REFERENCES estudiante(codigo),
    aula            TEXT NOT NULL,
    fila            INT NOT NULL,
    asiento         INT NOT NULL,
    primera_clase_dia BOOLEAN,
    tiempo_en_uni   TEXT,
    calidad_sueno_noche TEXT,
    cafeina_3h      TEXT,
    kss_entrada     SMALLINT,
    actividad_reciente TEXT,
    nivel_vestimenta TEXT,
    respondido_en   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE encuesta_salida (
    id              BIGSERIAL PRIMARY KEY,
    sesion_id       BIGINT NOT NULL REFERENCES sesion(id),
    codigo          TEXT NOT NULL REFERENCES estudiante(codigo),
    kss_salida      SMALLINT,
    pvt_mediana_ms  NUMERIC,
    pvt_lapsos      SMALLINT,
    concentracion   TEXT,
    fatiga          TEXT,
    sensacion_termica SMALLINT,
    preferencia_temp TEXT,
    frescor_aire    SMALLINT,
    aire_cargado    BOOLEAN,
    aprovechamiento TEXT,
    respondido_en   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE keystroke_signal (
    id              BIGSERIAL PRIMARY KEY,
    codigo          TEXT NOT NULL REFERENCES estudiante(codigo),
    sesion_id       BIGINT REFERENCES sesion(id),
    intervalos_ms   NUMERIC[],
    registrado_en   TIMESTAMPTZ NOT NULL DEFAULT now()
);