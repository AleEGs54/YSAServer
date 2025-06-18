const express = require("express");
require("dotenv").config()
const app = express();
const participantsRoute = require("./routes/participantRoute")

/* ******************************************
 * Middlewares
 * ***************************************** */

//To receive JSON
app.use(express.json())
//To send JSON
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})

/* ******************************************
 * Routes
 * ***************************************** */
app.use('/participants', participantsRoute)

/* ******************************************
 * Server host name and port
 * ***************************************** */
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

app.listen(port, () => {
    console.log(`Server started at http://${host}:${port}`)
})