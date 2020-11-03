const express = require('express');
const cors = require('cors');
const path = require('path').join(__dirname, '../client/dist/');
const history = require('connect-history-api-fallback');

const app = express();
const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/shoutoutRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/valuesRoutes'));
app.use('/api', require('./routes/slackRoutes'));

app.use(
  history({
    verbose: true,
  }),
);

app.use('/', express.static(path));

module.exports = app;
