'use strict';

const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

// Declare Constants
const PORT = 8888;
const HOST = '0.0.0.0';
const APP_ROUTE = '/colormoves';

// Define App
const app = express();

// Static Files.
app.use(serveStatic(path.join(__dirname, '.')));
app.use(serveStatic(path.join(__dirname, 'lib')));

// App Route Responses.
app.get('*', (req, res) => {
    // Permanent redirect to the app route.
    res.sendStatus(301).redirect('/');
});

app.get('/', (req, res) => {
    // Permanent redirect to the app route.
    res.sendStatus(301).redirect(APP_ROUTE);
});

app.get(APP_ROUTE, (req, res) => {
    res.sendStatus(200).sendFile(path.join(__dirname, '/index.html'));
});

// Start App.
app.listen(PORT, HOST);

// Logging.
console.log(`Running on http://${HOST}:${PORT}${APP_ROUTE}`);