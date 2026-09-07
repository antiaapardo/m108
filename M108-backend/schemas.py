from pydantic import BaseModel
from typing import Optional

class EncuestaBasal(BaseModel):
    codigo: str
    consentimiento: bool
    edad: Optional[int] = None
    genero: Optional[str] = None
    condicion_termorregulacion: Optional[str] = None
    horas_sueno: Optional[str] = None
    calidad_sueno: Optional[str] = None
    frecuencia_cafeina: Optional[str] = None
    sensibilidad_termica: Optional[str] = None
    factores_ubicacion: Optional[list[str]] = None
    nivel_atencion: Optional[str] = None

class SesionDocente(BaseModel):
    aula: str
    accion: Optional[str] = "inicio"
    sesion_id: Optional[int] = None
    docente: Optional[str] = None
    materia: Optional[str] = None
    hora_override: Optional[str] = None
    tipo_sesion: Optional[str] = None
    estructura_descanso: Optional[str] = None
    num_estudiantes: Optional[int] = None
    asistencia_tipica: Optional[str] = None
    incidencias: Optional[str] = None
    marcar_fin: Optional[bool] = False

class EncuestaEntrada(BaseModel):
    sesion_id: int
    codigo: str
    aula: str
    fila: int
    asiento: int
    primera_clase_dia: Optional[bool] = None
    tiempo_en_uni: Optional[str] = None
    calidad_sueno_noche: Optional[str] = None
    cafeina_3h: Optional[str] = None
    kss_entrada: Optional[int] = None
    actividad_reciente: Optional[str] = None
    nivel_vestimenta: Optional[str] = None

class EncuestaSalida(BaseModel):
    sesion_id: int
    codigo: str
    kss_salida: Optional[int] = None
    pvt_mediana_ms: Optional[float] = None
    pvt_lapsos: Optional[int] = None
    concentracion: Optional[str] = None
    fatiga: Optional[str] = None
    sensacion_termica: Optional[int] = None
    preferencia_temp: Optional[str] = None
    frescor_aire: Optional[int] = None
    aire_cargado: Optional[bool] = None
    aprovechamiento: Optional[str] = None

class KeystrokeSignal(BaseModel):
    codigo: str
    sesion_id: Optional[int] = None
    intervalos_ms: list[float]