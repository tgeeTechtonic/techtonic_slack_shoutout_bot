const axios = require('axios');
const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const db = require('knex')(config);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).json({ data: 'TECHTONIC SLACK SHOUT BOT SERVER' });
});

module.exports = app;
