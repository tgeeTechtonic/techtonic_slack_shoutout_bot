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

router.get('/reports/monthly', async (req, res) => {
  const { month, type, year } = req.query;
  try {
    const shoutouts = await shoutoutController.getRankedReportByMonth(
      month,
      type,
      year
    );
    res.status(200).json(shoutouts);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/shoutouts', async (req, res) => {
  try {
    const shoutouts = await shoutoutController.getAllShoutOuts();
    res.status(200).json(shoutouts);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/shoutouts/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query;
  const days = req.query.days ? req.query.days : 30;
  try {
    const shoutouts = await shoutoutController.getShoutoutsByuserId(
      type,
      userId,
      days
    );
    res.status(202).json(shoutouts);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
