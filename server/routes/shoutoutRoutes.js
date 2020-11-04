const express = require('express');
const router = express.Router();
const shoutoutController = require('../controllers/shoutoutController');
const { verifyParams } = require('../middleware');

router.get('/recents', async (req, res) => {
  try {
    const shoutouts = await shoutoutController.getRecentShoutouts();

    if (shoutouts.length) res.status(200).json(shoutouts);
    else res.status(204).json('No Content');
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/reports/monthly', verifyParams, async (req, res) => {
  try {
    const { month, type, year } = req.query;
    const shoutouts = await shoutoutController.getRankedReportByMonth(
      month,
      type,
      year
    );

    if (shoutouts.length) res.status(200).json(shoutouts);
    else res.status(204).json('No Content');
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/shoutouts', async (req, res) => {
  try {
    const shoutouts = await shoutoutController.getAllShoutOuts();

    if (shoutouts.length) res.status(200).json(shoutouts);
    else res.status(204).json('No Content');
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/shoutouts/user/:userId', verifyParams, async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;
    const days = req.query.days ? req.query.days : 30;
    const shoutouts = await shoutoutController.getShoutoutsByuserId(
      type,
      userId,
      days
    );

    if (shoutouts.length) res.status(200).json(shoutouts);
    else res.status(204).json('No Content');
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
