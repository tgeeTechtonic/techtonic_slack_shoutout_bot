const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/shoutoutRoutes'));
app.use('/api', require('./routes/slackRoutes'));

module.exports = app;
