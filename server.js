const express = require("express");
require("dotenv").config()
const app = express();
const participantsRoute = require("./routes/participantRoute")
const session = require('express-session')
const pool = require("./database")
const cors = require('cors')

/* ******************************************
* Middlewares
* ***************************************** */

//Builds a session into the database so the user doesn't have to login every request.
app.use(session({
    store: new (require('connect-pg-simple')(session))({
        createTableIfMissing: true,
        pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: 'sessionId',
}))

/* ******************************************
* CORS Configuration
* ***************************************** */
const whitelist = ['http://localhost:3000']

app.use(cors((origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
}))

app.options('*', cors())

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