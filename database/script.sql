-- PostgreSQL Version of Schema `conferencia_jas`

-- Drop tables if they exist (in order due to FK constraints)
DROP TABLE IF EXISTS leadership_member CASCADE;
DROP TABLE IF EXISTS participant_audit CASCADE;
DROP TABLE IF EXISTS emergency_contacts CASCADE;
DROP TABLE IF EXISTS leadership_role CASCADE;
DROP TABLE IF EXISTS participant CASCADE;
DROP TABLE IF EXISTS company CASCADE;
DROP TABLE IF EXISTS counselor CASCADE;

-- Drop types if exist
DROP TYPE IF EXISTS sex_enum;
DROP TYPE IF EXISTS shirt_size_enum;
DROP TYPE IF EXISTS member_enum;
DROP TYPE IF EXISTS payment_enum;
DROP TYPE IF EXISTS role_name_enum;
DROP TYPE IF EXISTS audit_action_enum;

-- ENUM Types
CREATE TYPE sex_enum AS ENUM ('MASCULINO', 'FEMENINO');
CREATE TYPE shirt_size_enum AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');
CREATE TYPE member_enum AS ENUM ('SI', 'NO');
CREATE TYPE payment_enum AS ENUM ('SI', 'NO', 'STAFF');
CREATE TYPE role_name_enum AS ENUM ('Coordinadores', 'STAFF', 'Líder JAS Estaca', 'Líder JAS Barrio', 'Miembro Auxiliar');
CREATE TYPE audit_action_enum AS ENUM ('INSERT', 'UPDATE', 'DELETE');

-- Tables
CREATE TABLE company (
  company_id SERIAL PRIMARY KEY,
  building_number INTEGER
);

CREATE TABLE participant (
  participant_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  preferred_name VARCHAR(45) NOT NULL,
  dob DATE NOT NULL,
  sex sex_enum NOT NULL,
  mobile_number VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  shirt_size shirt_size_enum NOT NULL,
  member_of_church member_enum NOT NULL DEFAULT 'SI',
  stake VARCHAR(45) NOT NULL,
  ward VARCHAR(45) NOT NULL,
  blood_type VARCHAR(45) NOT NULL,
  allergies TEXT NOT NULL,
  treatment TEXT NOT NULL,
  diabetic_or_asthathic TEXT NOT NULL,
  health_insurance VARCHAR(100) NOT NULL,
  covid_vaccine_doses VARCHAR(45) NOT NULL,
  payment payment_enum DEFAULT 'NO',
  early_retirement BOOLEAN DEFAULT FALSE,
  attendace BOOLEAN DEFAULT FALSE,
  is_counselor BOOLEAN DEFAULT FALSE,
  company_id INTEGER REFERENCES company(company_id)
);

CREATE TABLE leadership_role (
  staff_role_id SERIAL PRIMARY KEY,
  role_name role_name_enum NOT NULL
);

CREATE TABLE leadership_member (
  leadership_member_id SERIAL PRIMARY KEY,
  participant_id INTEGER NOT NULL REFERENCES participant(participant_id) ON DELETE CASCADE ON UPDATE CASCADE,
  staff_role_id INTEGER NOT NULL REFERENCES leadership_role(staff_role_id) ON DELETE CASCADE ON UPDATE CASCADE,
  account_email VARCHAR(100),
  account_password TEXT
);

CREATE TABLE emergency_contacts (
  emergency_contacts_id SERIAL PRIMARY KEY,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  mobile_number VARCHAR(45) NOT NULL,
  participant_id INTEGER NOT NULL REFERENCES participant(participant_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE participant_audit (
  participant_audit_id SERIAL PRIMARY KEY,
  participant_id INTEGER NOT NULL,
  action audit_action_enum NOT NULL,
  changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  changed_by INTEGER NOT NULL,
  old_values JSON NOT NULL,
  new_values JSON NOT NULL
);

CREATE TABLE counselor (
  counselor_id SERIAL PRIMARY KEY
);

-- Triggers for counselor count
CREATE OR REPLACE FUNCTION check_counselor_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_counselor THEN
    IF (
      SELECT COUNT(*) FROM participant
      WHERE company_id = NEW.company_id AND is_counselor = TRUE
    ) >= 2 THEN
      RAISE EXCEPTION 'Una compañía no puede tener más de 2 consejeros.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER participant_before_insert
BEFORE INSERT ON participant
FOR EACH ROW
EXECUTE FUNCTION check_counselor_count();

CREATE TRIGGER participant_before_update
BEFORE UPDATE ON participant
FOR EACH ROW
EXECUTE FUNCTION check_counselor_count();
-- Data Samples
INSERT INTO participant (
  first_name, last_name, preferred_name, dob, sex, mobile_number, email, age,
  shirt_size, member_of_church, stake, ward, blood_type, allergies, treatment,
  diabetic_or_asthathic, health_insurance, covid_vaccine_doses, payment
) VALUES
('Pedro Yeremi', 'Davila Espinoza', 'Yeremi', '1996-06-14', 'MASCULINO', '912289922', 'yeridaes01@gmail.com', 28, 'M', 'SI', 'Estaca Limatambo', 'Lince', 'O+', 'no', 'no', 'no', 'Rímac', '3', 'NO'),
('Sasha Olenka', 'Pastor Eslava', 'Sasha', '1995-02-15', 'FEMENINO', '959267202', 'sasha.olenka95@gmail.com', 29, 'S', 'SI', 'Estaca Magdalena', 'Bolivar', 'O+', 'No', 'No', 'No', 'Rimac', '4', 'NO'),
('Jennifer Camila', 'López Torres', 'Camila', '2004-03-22', 'FEMENINO', '923815254', 'lopeztorresjennifercamila@gmail.com', 20, 'M', 'SI', 'Estaca Surco', 'Villa Alegre', 'A+', 'Al polvo', 'Para el acné', 'No', 'Ninguno', '3', 'NO'),
('Andrea de Jesus', 'Mujica Estrada', 'Andy', '1993-06-21', 'FEMENINO', '987041568', 'andymu.bakery@gmail.com', 30, 'L', 'SI', 'Estaca Magdalena', 'Bolivar', 'A+', 'Alergia a los Mariscos', 'No', 'No', 'SIS', '4', 'NO'),
('Marietta Samantha Gissela', 'Malasquez Mendoza', 'Samantha', '2000-07-29', 'FEMENINO', '930662248', 'marietta.20.m@gmail.com', 24, 'S', 'SI', 'Estaca Limatambo', 'Barranco', 'O+', 'No', 'No', 'No', 'No', 'Si', 'NO'),
('Bryan Derek', 'Chucos Berrocal', 'Derek', '1990-11-10', 'MASCULINO', '971414605', 'Chucosbd@churchofjesuschrist.org', 30, 'L', 'SI', 'Estaca Surco', 'Villa Alegre', 'O Positivo', 'Ninguno', 'Ninguno', 'Ninguno', 'EPS', '3', 'NO'),
('Marcia Verónica', 'Núñez Contreras', 'Marcia', '1996-08-14', 'FEMENINO', '989992616', 'marciaveronicanu@gmail.com', 28, 'M', 'SI', 'Estaca Magdalena', 'Las Brisas', 'A positivo', 'Al sol', 'No', 'No', 'Essalud', '4', 'NO'),
('Patricia', 'Mora', 'Patricia', '1996-07-26', 'FEMENINO', '988988812', 'Patmoragut@gmail.com', 28, 'M', 'SI', 'Estaca Magdalena', 'Las brisas', 'O+', 'Al metamizol y penicilina', 'Tomo levotiroxina (hipotiroidismo)', 'No', 'Sis', '4', 'NO'),
('Carlos Enrique', 'Pedraza Lopez', 'Carlos', '1998-01-13', 'MASCULINO', '921776582', 'pedrazalopezcarlos@gmail.com', 26, 'XL', 'SI', 'Estaca San Juan', 'San juan', 'RH +', 'No', 'No', 'No', 'FOLA', '4', 'NO'),
('Claudia Fernanda', 'Sender Flores', 'Claudia', '2001-09-10', 'FEMENINO', '987779600', 'claudia.sender@hotmail.com', 22, 'S', 'SI', 'Estaca San Luis', 'Armonía', 'A+', 'Medicamentos sulfa', 'No', 'No', 'SIS', '4', 'NO');


SELECT * FROM participant;
