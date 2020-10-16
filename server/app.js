const axios = require('axios');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).json({ data: 'TECHTONIC SLACK SHOUT BOT SERVER' });
});

module.exports = app;
