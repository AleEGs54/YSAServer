    
import csv

column_map = {
    "Nombres": "first_name",
    "Apellidos": "last_name",
    "Nombre de preferencia": "preferred_name",
    "Fecha de Nacimiento": "dob",
    "Sexo": "sex",
    "Número de celular": "mobile_number",
    "Edad": "age",
    "Seleccione su estaca": "stake",
    "Barrio/Rama/GrupoFamiliar": "ward",
    "Grupo sanguíneo y factor (RH)": "blood_type",
    "¿Sufres de algún tipo de alergia?": "allergies",
    "¿Recibes algún tipo de tratamiento médico?": "treatment",
    "¿Eres diabético o asmático?": "diabetic_or_asthathic",
    "¿Con qué seguro médico cuentas?": "health_insurance",
    "¿Con cuántas dosis de vacunación contra COVID cuentas?": "covid_vaccine_doses",
    "Elija el tamaño de su camiseta": "shirt_size",
    "¿Eres miembro de la iglesia de Jesucristo de los Santos de los Últimos días?": "member_of_church"
}

def replace_column_names(input_path, output_path):
    """
    Replace column names in the input CSV file with the names specified in the
    column_map dictionary. Write the output to the specified output_path.

    Args:
        input_path (str): Path to the input CSV file
        output_path (str): Path where the output CSV file should be written

    Returns:
        None
    """
    with open(input_path, mode='r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        new_fieldnames = [column_map.get(col, col) for col in reader.fieldnames]
        rows = list(reader)

    with open(output_path, mode='w', encoding='utf-8', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=new_fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow({column_map.get(k, k): v for k, v in row.items()})