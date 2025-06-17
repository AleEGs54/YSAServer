const express = require("express");
require("dotenv").config()
const app = express();

/* ******************************************
 * Default GET route
 * ***************************************** */
app.get("/", (req, res) => {res.send("Welcome home!")})

/* ******************************************
 * Server host name and port
 * ***************************************** */
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

app.listen(port, () => {
    console.log(`Server started at http://${host}:${port}`)
})