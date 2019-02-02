// External modules
const express = require('express');
const bodyParser = require('body-parser');

// Internal modules
const partyController = require('../V1/routes/party');
const officeController = require('../V1/routes/office');

// Express setup
const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Express routing
app.use('/', partyController);
app.use('/', officeController);


const port = process.env.PORT || 3000;
const server = app.listen(port);

module.exports = server;
