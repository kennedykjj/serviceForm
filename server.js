var express = require('express');
var app = express();
var api = require('./server/api/api');
var config = require('./server/config/config');
// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url);

// setup the app middlware
require('./server/middleware/appMiddlware')(app);

// setup the api
app.use('/api/', api);
// set up global error handling

// export the app for testing
module.exports = app;
