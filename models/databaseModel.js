const pool = require("../database");
const dbModel = {};
const utilities = require("../utilities");

/* **********************
 *   POST
 * ********************* */

// En databaseModel.js

dbModel.insertParticipantCSV = async (participant) => {

  console.log(participant);

  const {
    participant_id,
    first_name,
    last_name,
    preferred_name,
    dob,
    sex,
    mobile_number,
    email,
    age,
    shirt_size,
    member_of_church,
    stake,
    ward,
    blood_type,
    allergies,
    treatment,
    diabetic_or_asthmatic,
    health_insurance,

    covid_vaccine_doses,
    emergency_contact_fname,
    emergency_contact_lname,
    emergency_contact_email,
    emergency_contact_number,
  } = participant;

  try {
    const participantQuery = `INSERT INTO participant (
      participant_id, first_name, last_name, preferred_name, dob, sex, mobile_number, email, age, shirt_size,
      member_of_church, stake, ward, blood_type, allergies, treatment, diabetic_or_asthmatic,
      health_insurance, covid_vaccine_doses
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17,
      $18, $19
    )
    ON CONFLICT (participant_id) DO NOTHING RETURNING *`;

    await pool.query(participantQuery, [
      participant_id,
      first_name,
      last_name,
      preferred_name,
      dob,
      sex,
      mobile_number,
      email,
      age,
      shirt_size,
      member_of_church,
      stake,
      ward,
      blood_type,
      allergies,
      treatment,
      diabetic_or_asthmatic,
      health_insurance,
      covid_vaccine_doses,
    ]);

    const emergencyContactQuery = `INSERT INTO emergency_contacts (
      participant_id, first_name, last_name, email, mobile_number
    )
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (participant_id) DO NOTHING RETURNING *`;

    await pool.query(emergencyContactQuery, [
      participant_id,
      emergency_contact_fname,
      emergency_contact_lname,
      emergency_contact_email,
      emergency_contact_number,
    ]);
  } catch (error) {
    throw new Error(
      `Error inserting participant emergency contact ${participant_id}: ${error.message}`
    );
  }
};

module.exports = dbModel;
