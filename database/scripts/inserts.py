
def generate_sql_statements(filas, nombre_tabla_placeholder='[NOMBRE_DE_TABLA]'):
    if not filas:
        print("No hay datos para generar statements.")
        return

    columnas = list(filas[0].keys())
    placeholders = ', '.join(['%s'] * len(columnas))
    columnas_str = ', '.join(columnas)

    query = f"INSERT INTO {nombre_tabla_placeholder} ({columnas_str}) VALUES ({placeholders});"

    for fila in filas:
        valores = tuple(fila[col] for col in columnas)
        print(query)
        print("Valores:", valores)
        print("-" * 80)

