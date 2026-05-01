const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const {createSession} = require("./services/session");
const fs = require('fs');
const cors = require('cors');
const auth = require('./utils/auth');
const config = require("./config");

const LOG_FOLDER = 'logs';
if (!fs.existsSync(LOG_FOLDER)) {
  fs.mkdirSync(LOG_FOLDER);
}

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, LOG_FOLDER, 'access.log'), { flags: 'a'})

const filesRouter = require('./routes/files');

// Allowed origins: any *.cancer.gov subdomain (https), and localhost on any port in non-production environments
const CANCER_GOV_ORIGIN = /^https:\/\/[a-zA-Z0-9-]+\.cancer\.gov(:\d+)?$/;
const LOCALHOST_ORIGIN = /^https?:\/\/localhost(:\d+)?$/;
const isProd = process.env.NODE_ENV === 'production';

const app = express();
if (config.mysqlSessionEnabled) app.use(createSession());
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests that have no Origin header
    if (!origin) return callback(null, true);
    if (CANCER_GOV_ORIGIN.test(origin)) return callback(null, true);
    if (!isProd && LOCALHOST_ORIGIN.test(origin)) return callback(null, true);
    callback(null, false);
  }
}));

// setup the logger
app.use(logger('combined', { stream: accessLogStream }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(auth(["/api/files/ping", "/api/files/version"]));
app.use('/api/files', filesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next({status: 404, message: `Path: '${req.path}' is not supported!`});
});

// error handler
app.use(function(err, req, res, next) {
  const message = req.app.get('env') === 'development' ? err.message : 'error';

  // render the error page
  res.status(err.status || 500);
  res.json(message);
});

module.exports = app;
