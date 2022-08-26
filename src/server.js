'use strict';

const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

// Declare Constants
const PORT = 8888;
const HOST = '0.0.0.0';
// const APP_ROUTE = '/colormoves';
const APP_ROUTE = '/';

// Define App
const app = express();

// Serve Static File Dirs.
app.use(serveStatic(path.join(__dirname, '.')));
app.use(serveStatic(path.join(__dirname, 'lib')));

// App Route Responses.
app.get(APP_ROUTE, (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start App.
app.listen(PORT, HOST);

// Logging.
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug'; // default level is OFF - which means no logs at all.
logger.debug(`Running on http://${HOST}:${PORT}${APP_ROUTE}`);
