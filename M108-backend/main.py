from fastapi import FastAPI
from database import obtener_conexion
from datetime import datetime, timezone
from schemas import EncuestaBasal, SesionDocente, EncuestaEntrada, EncuestaSalida, KeystrokeSignal
from codigos import generar_codigo_con_checksum, validar_codigo
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


app = FastAPI()
@app.get("/docente")
def pagina_docente():
    return FileResponse("../M108-frontend/docente.html")

@app.post("/api/v1/estudiante/token")
def crear_token():
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            "INSERT INTO estudiante DEFAULT VALUES RETURNING id"
        )
        nuevo_id = cursor.fetchone()["id"]

        codigo = generar_codigo_con_checksum(nuevo_id)
        cursor.execute(
            "UPDATE estudiante SET codigo = %s WHERE id = %s RETURNING codigo, idioma, creado_en",
            (codigo, nuevo_id),
        )
        fila = cursor.fetchone()
        conexion.commit()
    conexion.close()
    return fila


@app.post("/api/v1/estudiante/basal")
def enviar_basal(datos: EncuestaBasal):
    if not datos.consentimiento:
        return {"error": "consentimento_requirido"}

    conexion = obtener_conexion()
    with conexion.cursor() as cur:
        cur.execute(
            """
            INSERT INTO encuesta_basal
                (codigo, edad, genero, condicion_termorregulacion, horas_sueno,
                 calidad_sueno, frecuencia_cafeina, sensibilidad_termica,
                 factores_ubicacion, nivel_atencion)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, respondido_en
            """,
            (
                datos.codigo, datos.edad, datos.genero,
                datos.condicion_termorregulacion, datos.horas_sueno,
                datos.calidad_sueno, datos.frecuencia_cafeina,
                datos.sensibilidad_termica, datos.factores_ubicacion,
                datos.nivel_atencion,
            ),
        )
        fila = cur.fetchone()
        conexion.commit()
    conexion.close()
    return fila


def resolver_materia(aula: str, momento: datetime) -> str | None:
    conexion = obtener_conexion()
    with conexion.cursor() as cur:
        cur.execute(
            """
            SELECT materia FROM horario_academico
            WHERE aula = %s AND dia_semana = %s
              AND hora_inicio <= %s AND hora_fin > %s
            LIMIT 1
            """,
            (aula, momento.isoweekday(), momento.time(), momento.time()),
        )
        fila = cur.fetchone()
    conexion.close()
    return fila["materia"] if fila else None

def calcular_minutos_desde_anterior(aula: str, momento: datetime) -> int | None:
    conexion = obtener_conexion()
    with conexion.cursor() as cur:
        cur.execute(
            """
            SELECT hora_fin_real FROM sesion
            WHERE aula = %s AND hora_fin_real IS NOT NULL AND hora_fin_real < %s
            ORDER BY hora_fin_real DESC
            LIMIT 1
            """,
            (aula, momento),
        )
        fila = cur.fetchone()
    conexion.close()

    if not fila or not fila["hora_fin_real"]:
        return None

    diferencia = momento - fila["hora_fin_real"]
    return round(diferencia.total_seconds() / 60)

@app.post("/api/v1/sesion/docente")
def gestionar_sesion_docente(datos: SesionDocente):
    momento = datetime.fromisoformat(datos.hora_override) if datos.hora_override else datetime.now(timezone.utc)
    
    if datos.accion == "actualizar":
        marcar_fin = momento if (datos.hora_override or datos.marcar_fin) else None

        conexion = obtener_conexion()
        with conexion.cursor() as cur:
            cur.execute(
                """
                UPDATE sesion SET
                    hora_fin_real = COALESCE(%s, hora_fin_real),
                    tipo_sesion = COALESCE(%s, tipo_sesion),
                    estructura_descanso = COALESCE(%s, estructura_descanso),
                    num_estudiantes = COALESCE(%s, num_estudiantes),
                    asistencia_tipica = COALESCE(%s, asistencia_tipica),
                    incidencias = COALESCE(%s, incidencias)
                WHERE id = %s
                RETURNING *
                """,
                (
                    marcar_fin, datos.tipo_sesion, datos.estructura_descanso,
                    datos.num_estudiantes, datos.asistencia_tipica, datos.incidencias,
                    datos.sesion_id,
                ),
            )
            fila = cur.fetchone()
            conexion.commit()
        conexion.close()
        if not fila:
            return {"error": "sesion_no_encontrada"}
        return fila

    materia = datos.materia or resolver_materia(datos.aula, momento)
    minutos_anterior = calcular_minutos_desde_anterior(datos.aula, momento)

    conexion = obtener_conexion()
    with conexion.cursor() as cur:
        cur.execute(
            """
            INSERT INTO sesion (aula, fecha, hora_inicio_real, docente, materia, minutos_desde_anterior)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id, aula, fecha, hora_inicio_real, docente, materia, minutos_desde_anterior
            """,
            (datos.aula, momento.date(), momento, datos.docente, materia, minutos_anterior),
        )
        fila = cur.fetchone()
        conexion.commit()
    conexion.close()
    return fila


@app.post("/api/v1/sesion/salida")
def enviar_salida(datos: EncuestaSalida):
    conexion = obtener_conexion()
    with conexion.cursor() as cur:
        cur.execute(
            """
            INSERT INTO encuesta_salida
                (sesion_id, codigo, kss_salida, pvt_mediana_ms, pvt_lapsos,
                 concentracion, fatiga, sensacion_termica, preferencia_temp,
                 frescor_aire, aire_cargado, aprovechamiento)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, respondido_en
            """,
            (
                datos.sesion_id, datos.codigo, datos.kss_salida, datos.pvt_mediana_ms,
                datos.pvt_lapsos, datos.concentracion, datos.fatiga,
                datos.sensacion_termica, datos.preferencia_temp, datos.frescor_aire,
                datos.aire_cargado, datos.aprovechamiento,
            ),
        )
        fila_resultado = cur.fetchone()
        conexion.commit()
    conexion.close()
    return fila_resultado

@app.get("/api/v1/horario")
def consultar_horario(aula: str, dia: int, hora: str):
    conexion = obtener_conexion()
    with conexion.cursor() as cur:
        cur.execute(
            """
            SELECT materia FROM horario_academico
            WHERE aula = %s AND dia_semana = %s
              AND hora_inicio <= %s AND hora_fin > %s
            LIMIT 1
            """,
            (aula, dia, hora, hora),
        )
        fila = cur.fetchone()
    conexion.close()

    if not fila:
        return {"error": "materia_non_atopada"}
    return {"aula": aula, "materia": fila["materia"]}

@app.post("/api/v1/estudiante/keystroke")
def guardar_keystroke(datos: KeystrokeSignal):
    conexion = obtener_conexion()
    with conexion.cursor() as cur:
        cur.execute(
            """
            INSERT INTO keystroke_signal (codigo, sesion_id, intervalos_ms)
            VALUES (%s, %s, %s)
            RETURNING id, registrado_en
            """,
            (datos.codigo, datos.sesion_id, datos.intervalos_ms),
        )
        fila = cur.fetchone()
        conexion.commit()
    conexion.close()
    return fila

@app.get("/api/v1/estudiante/{codigo}/estado")
def consultar_estado(codigo: str):
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cur:
            cur.execute(
                "SELECT codigo FROM estudiante WHERE codigo = %s",
                (codigo,),
            )
            estudiante = cur.fetchone()

            if not estudiante:
                return {"error": "codigo_no_encontrado"}

            cur.execute(
                "SELECT id FROM encuesta_basal WHERE codigo = %s LIMIT 1",
                (codigo,),
            )
            fila = cur.fetchone()
        return {"tiene_basal": fila is not None}
    except Exception:
        conexion.rollback()
        return {"error": "codigo_no_encontrado"}
    finally:
        conexion.close()

@app.get("/api/v1/sesion/activa")
def sesion_activa(aula: str):
    conexion = obtener_conexion()
    with conexion.cursor() as cur:
        cur.execute(
            """
            SELECT id, aula, fecha, hora_inicio_real, docente, materia
            FROM sesion
            WHERE aula = %s AND hora_fin_real IS NULL
            ORDER BY hora_inicio_real DESC
            LIMIT 1
            """,
            (aula,),
        )
        fila = cur.fetchone()
    conexion.close()

    if not fila:
        return {"error": "sin_sesion_activa"}
    return fila


@app.post("/api/v1/sesion/entrada")
def enviar_entrada(datos: EncuestaEntrada):
    conexion = obtener_conexion()
    with conexion.cursor() as cur:
        cur.execute(
            """
            INSERT INTO encuesta_entrada
                (sesion_id, codigo, aula, fila, asiento, primera_clase_dia,
                 tiempo_en_uni, calidad_sueno_noche, cafeina_3h, kss_entrada,
                 actividad_reciente, nivel_vestimenta)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, respondido_en
            """,
            (
                datos.sesion_id, datos.codigo, datos.aula, datos.fila, datos.asiento,
                datos.primera_clase_dia, datos.tiempo_en_uni, datos.calidad_sueno_noche,
                datos.cafeina_3h, datos.kss_entrada, datos.actividad_reciente,
                datos.nivel_vestimenta,
            ),
        )
        fila_resultado = cur.fetchone()
        conexion.commit()
    conexion.close()
    return fila_resultado


app.mount("/", StaticFiles(directory="../M108-frontend", html=True), name="frontend")
