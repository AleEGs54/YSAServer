import csv
import os


def csvCleaner(originalFile, newFile):

    # Verificar si el archivo original existe
    if not os.path.exists(originalFile):
        print(f"No se encontró el archivo en: {originalFile}")
        exit()

    # Leer y procesar el archivo
    with open(originalFile, mode='r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        columnas_a_eliminar = {"Columna1", "Columna2", "Pago"}
        fieldnames = [field for field in reader.fieldnames if field not in columnas_a_eliminar]
        
        filas = []
        for row in reader:
            for col in columnas_a_eliminar:
                row.pop(col, None)
            filas.append(row)

    # Escribir el nuevo archivo
    with open(newFile, mode='w', encoding='utf-8', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(filas)

    print(f"Archivo nuevo creado: '{newFile}', sin columnas {columnas_a_eliminar}.")









