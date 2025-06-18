
import csv
from clean import csvCleaner
from inserts import generate_sql_statements
from replace import replace_column_names

originalFile = 'database/csv-files/ES_REPORTE.csv'
newFile = 'database/csv-files/participantes-conferencia-jas.csv'

#Clean the file
csvCleaner(originalFile, newFile)

#Replace the column names
replace_column_names(newFile, newFile)

#Then generate the sql statements
with open(newFile, mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    filas = list(reader)


generate_sql_statements(filas, 'participant')
