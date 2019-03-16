const express = require('express');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

require('dotenv').config();

const app = express();
const db = require('./db');

const globals = {};

globals.dbInstance = db;
globals.db = {};
globals.db.MeetingsModel = require('./models/MeetingsModel')(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());

app.use(cors({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Credentials'],
  optionsSuccessStatus: 200,
}));

app.use(new rateLimiter({
  windowMs: 60*1000,
  delayAfter: 0,
  delayMs: 0,
  max: 30,
  message: 'Too many requests, please try again later.',
  statusCode: 429,
  headers: true,
}));

const echoRoute = require('./routes/echo')(globals);
const meetingsRoute = require('./routes/meetingsRoute')(globals);

app.use(echoRoute);
app.use(meetingsRoute);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err,
        });
    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {},
    });
});

app.listen(3003);
module.exports = app;