const Utilities = {}


const multer = require("multer")

/* ****************************************
 * Middleware to upload files in memory
 **************************************** */
const storage = multer.memoryStorage();
 Utilities.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos CSV!"));
    }
  }
});


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Utilities.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Utilities