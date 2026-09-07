import os
import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv

load_dotenv()

def obtener_contrasena():
    ruta_secreto = os.getenv("DB_PASSWORD_FILE")
    if ruta_secreto and os.path.exists(ruta_secreto):
        with open(ruta_secreto, "r") as f:
            return f.read().strip()
    return os.getenv("DB_PASSWORD")

def obtener_conexion():
    return psycopg.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=obtener_contrasena(),
        row_factory=dict_row,
    )