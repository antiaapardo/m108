def calcular_digito_luhn(numero_str: str) -> int:
    digitos = [int(d) for d in numero_str]
    digitos.reverse()

    suma = 0
    for posicion, digito in enumerate(digitos):
        if posicion % 2 == 0:
            digito *= 2
            if digito > 9:
                digito -= 9
        suma += digito

    return (10 - (suma % 10)) % 10


def generar_codigo_con_checksum(numero_secuencial: int) -> str:
    base = str(numero_secuencial).zfill(3)
    digito_control = calcular_digito_luhn(base)
    return f"{base}{digito_control}"


def validar_codigo(codigo: str) -> bool:
    if len(codigo) != 4 or not codigo.isdigit():
        return False
    base, control = codigo[:3], int(codigo[3])
    return calcular_digito_luhn(base) == control