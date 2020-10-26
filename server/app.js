const axios = require('axios');
const express = require('express');
const { environment } = require('./dbConfig');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/shoutoutRoutes'));

module.exports = app;
