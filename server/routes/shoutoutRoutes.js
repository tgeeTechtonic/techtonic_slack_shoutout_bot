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
    const start_date = req.query['start-date'];
    const end_date = req.query['end-date'];
    const shoutouts = await shoutoutController.getAllShoutOuts(
      start_date,
      end_date
    );

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
    const start_date = req.query['start-date'];
    const end_date = req.query['end-date'];
    const shoutouts = await shoutoutController.getShoutoutsByuserId(
      type,
      userId,
      start_date,
      end_date
    );

    if (shoutouts.length) res.status(200).json(shoutouts);
    else res.status(204).json('No Content');
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

module.exports = router;
