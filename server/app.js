const axios = require('axios');
const express = require('express');
const history = require('connect-history-api-fallback');
const { environment } = require('./dbConfig');

let app = express();
app.use(history());
const path = require('path').join(__dirname, '../client/dist/')
app.use(express.static(path));

app.get('/home', (req, res) => {
  res.sendFile(
    'index.html', { root: path }
  );
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/shoutoutRoutes'));

module.exports = app;
