const dbController = {};
const dbModel = require("../models/databaseModel");


dbController.updateDB = async (req, res) => {


  try {
    
    const rows = req.csvRows;
  
    let insertedCount = 0;
    console.log(req.csv);
    for (const row of rows) {
      await dbModel.insertParticipantCSV(row);
      insertedCount++;
    }
    res.status(200).json({
      success: true,
      message: `Participants inserted into the database`,
      meta: {
        total: insertedCount,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error inserting participants into the database`,
      error: error.message
    })
  }

};

module.exports = dbController;
