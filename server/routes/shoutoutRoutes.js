const express = require('express');
const router = express.Router();
const shoutoutController = require('../controllers/shoutoutController');

router.get('/recents', async (req, res) => {
  try {
    const shoutouts = await shoutoutController.getRecentShoutouts();
    res.status(200).json(shoutouts);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
