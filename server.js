const express = require("express");
require("dotenv").config()
const app = express();
const participantsRoute = require("./routes/participantRoute")
const databaseRoute = require("./routes/databaseRoute")
const accountRoute = require("./routes/accountRoute")
const session = require('express-session')
const pool = require("./database")
const cors = require('cors')
const cookieParser = require('cookie-parser')


/* ******************************************
* CORS Configuration
* ***************************************** */
const whitelist = ['http://localhost:5173']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)|| !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}


app.use(cors(corsOptions))

app.options('/', cors(corsOptions))

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

//To receive JSON
app.use(express.json())
//To send JSON
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})

app.use(cookieParser())

/* ******************************************
 * Routes
 * ***************************************** */
app.use('/account', accountRoute)
app.use('/participants', participantsRoute)
app.use('/operations', databaseRoute)

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message } else { message = 'Non existing route. Maybe try a different route?' }
  res.status(err.status || 500).json({
      success:false,
      message: message,
      error: err.message,
      status: err.status
  })
})

/* ******************************************
 * Server host name and port
 * ***************************************** */
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

app.listen(port, () => {
    console.log(`Server started at http://${host}:${port}`)
})