const express = require('express');
const router = express.Router();
const slackController = require('../controllers/slackController');
const { parseReqData } = require('../utils');

router.post('/add-shoutout', async (req, res) => {
  try {
    const {
      channel_name,
      company_value,
      shoutee_slack_id,
      shouter_slack_id,
      shoutout,
    } = parseReqData(req.body);

    const companyValueId = await slackController.findorCreateCompanyValue(
      company_value
    );
    const shouteeId = await slackController.findOrCreateUser(shoutee_slack_id);
    const shouterId = await slackController.findOrCreateUser(shouter_slack_id);

    const shoutOutId = await slackController.addShoutout(
      channel_name,
      companyValueId,
      shouteeId,
      shouterId,
      shoutout
    );

    const insertsSuccess =
      companyValueId[0] && shouteeId[0] && shouterId[0] && shoutOutId[0];

    if (insertsSuccess) res.status(201).json({ msg: 'Added' });
    else res.status(401).json({ text: "didn't work" });
  } catch (err) {
    console.log({ err });
  }
});

module.exports = router;
