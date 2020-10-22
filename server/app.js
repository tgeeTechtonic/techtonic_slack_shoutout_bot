const axios = require('axios');
const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const db = require('knex')(config);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api', async (req, res) => {
  try {
    const shoutouts = await db('shoutouts')
      .select()
      .then((shoutouts) => shoutouts);
    res.status(200).json({ data: shoutouts });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = app;
