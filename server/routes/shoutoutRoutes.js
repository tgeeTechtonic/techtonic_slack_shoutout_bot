const express = require('express');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const db = require('knex')(config);

router.get('/', async (req, res) => {
  try {
    const shoutouts = await db('shoutouts')
      .select()
      .then((shoutouts) => shoutouts);
    res.status(200).json({ data: shoutouts });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
