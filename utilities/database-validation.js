const utilities = require("../utilities");
const { Readable } = require("stream");
const csv = require("csv-parser");
const { parse, format } = require("date-fns");

const validate = {};

//Sanitize fn
validate.parseDate = (input) => {
  const possibleFormats = [
    "d/M/yy",
    "d/M/yyyy",
    "dd/MM/yy",
    "dd/MM/yyyy",
    "M/d/yy",
    "M/d/yyyy",
    "MM/dd/yy",
    "MM/dd/yyyy",
    "d-M-yy",
    "d-M-yyyy",
    "M-d-yy",
    "M-d-yyyy",
  ];

  for (const fmt of possibleFormats) {
    const parsed = parse(input, fmt, new Date());
    if (parsed instanceof Date && !isNaN(parsed.getTime())) {
      return format(parsed, "yyyy-MM-dd");
    }
  }
  throw new Error(`Unknown date format: ${input}`);
};

validate.initErrors = (req, res, next) => {
  req.validateErrors = [];
  next();
};

//validate fn
//Takes csv file and splits it into rows
validate.destructureData = (req, res, next) => {
  if (!req.file) {
    req.validateErrors.push("No file uploaded");
    next();
    return;
  }

  try {
    const rows = [];
    const stream = Readable.from(req.file.buffer);

    stream
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", () => {
        req.csvRows = rows;
        next();
      });
  } catch (error) {
    req.validateErrors.push(error.message);
    next();
  }
};

//Sanitize fn
validate.formatKeys = (req, res, next) => {
  try {
    const keyMap = {
      Columna1: "participant_id",
      Nombres: "first_name",
      Apellidos: "last_name",
      "Nombre de preferencia": "preferred_name",
      "Fecha de Nacimiento": "dob",
      Sexo: "sex",
      "Número de celular": "mobile_number",
      "Correo Electrónico": "email",
      Edad: "age",
      "Elija el tamaño de su camiseta": "shirt_size",
      "¿Eres miembro de la iglesia de Jesucristo de los Santos de los Últimos días?":
        "member_of_church",
      "Seleccione su estaca": "stake",
      "Barrio/Rama/GrupoFamiliar": "ward",
      "Grupo sanguíneo y factor (RH)": "blood_type",
      "¿Sufres de algún tipo de alergia?": "allergies",
      "¿Recibes algún tipo de tratamiento médico?": "treatment",
      "¿Eres diabético o asmático?": "diabetic_or_asthmatic",
      "¿Con qué seguro médico cuentas?": "health_insurance",
      "¿Con cuántas dosis de vacunación contra COVID cuentas?":
        "covid_vaccine_doses",
      "Nombre - Persona de contacto": "emergency_contact_fname",
      "Apellido - Persona de contacto": "emergency_contact_lname",
      "Correo Electrónico - Persona de contacto": "emergency_contact_email",
      "Teléfono - Persona de contacto": "emergency_contact_number",
    };

    const formattedRows = req.csvRows.map((row) => {
      const newRow = {};
      for (const [oldKey, value] of Object.entries(row)) {
        const newKey = keyMap[oldKey] || oldKey; //If not in the map, use the old key
        newRow[newKey] = value;
      }
      return newRow;
    });

    req.csvRows = formattedRows;
  } catch (error) {
    req.validateErrors.push(error.message);
  }
  next();
};

//validate fn
validate.checkColumns = (req, res, next) => {
  try {
    const requiredColumns = [
      "participant_id",
      "first_name",
      "last_name",
      "preferred_name",
      "dob",
      "sex",
      "mobile_number",
      "email",
      "age",
      "shirt_size",
      "member_of_church",
      "stake",
      "ward",
      "blood_type",
      "allergies",
      "treatment",
      "diabetic_or_asthmatic",
      "health_insurance",
      "covid_vaccine_doses",
      "emergency_contact_fname",
      "emergency_contact_lname",
      "emergency_contact_email",
      "emergency_contact_number",
    ];

    if (!req.csvRows || req.csvRows.length === 0) {
      throw new Error("No CSV rows to validate");
    }

    const rowKeys = Object.keys(req.csvRows[0]);
    const missingColumns = requiredColumns.filter(
      (col) => !rowKeys.includes(col)
    );

    if (missingColumns.length > 0) {
      req.validateErrors.push(`Missing columns: ${missingColumns.join(", ")}`);
    }
  } catch (error) {
    req.validateErrors = req.validateErrors || [];
    req.validateErrors.push(error.message);
  }
  next();
};

//Sanitize fn
//Formats SI and NO, also formats dates
validate.formatValues = (req, res, next) => {
  try {
    const formattedRows = req.csvRows.map((row) => {
      const newRow = {};
      for (const [key, value] of Object.entries(row)) {
        let newValue = value;
        if (value === "" || value === null || value === "Sin completar") {
          newValue = null;
        } else if (key.toLowerCase().includes("dob")) {
          newValue = validate.parseDate(value);
        } else if (["Si", "Sí", "si", "sí"].includes(value)) {
          newValue = "SI";
        } else if (["No", "no"].includes(value)) {
          newValue = "NO";
        }
        newRow[key] = newValue;
      }
      return newRow;
    });
    req.csvRows = formattedRows;
  } catch (error) {
    req.validateErrors.push(error.message);
  }
  next();
};

//errors fn
validate.errorCatcher = (req, res, next) => {
  if (req.validateErrors && req.validateErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: req.validateErrors,
    });
  }
  next();
};

validate.csvValidator = () => {
  return [
    validate.initErrors,
    validate.destructureData,
    validate.formatKeys,
    validate.checkColumns,
    validate.formatValues,
    validate.errorCatcher,
  ];
};

module.exports = validate;
