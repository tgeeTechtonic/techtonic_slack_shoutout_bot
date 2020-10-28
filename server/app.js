const axios = require('axios');
const express = require('express');

let app = express();
const path = require('path').join(__dirname, '../client/dist/')

app.use(express.static(path));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/shoutoutRoutes'));

module.exports = app;
