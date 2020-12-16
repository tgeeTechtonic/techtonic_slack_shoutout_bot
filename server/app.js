require('./dbConfig');
const express = require('express');
const cors = require('cors');
const path = require('path').join(__dirname, '../client/dist/');
const history = require('connect-history-api-fallback');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/shoutoutRoutes'));
app.use('/api', require('./routes/slackRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/valuesRoutes'));
app.use('/api', require('./routes/adminRoutes'));
app.all('/api*', (req, res) => {
  res
    .status(400)
    .json('The endpoint you are trying to use has not been implemented');
});

app.use(history());

app.use('/', express.static(path));

module.exports = app;
