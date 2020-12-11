const express = require('express');
const router = express.Router();
const slackController = require('../controllers/slackController');
const { parseReqData } = require('../utils');

router.post('/add-shoutout', async (req, res) => {
  try {
    const insertsSuccess = await insertIntoDb(
      req.body,
      new Date().toDateString()
    );

    if (insertsSuccess) res.status(201).json({ msg: 'Added' });
    else res.status(401).json({ msg: "didn't work" });
  } catch (err) {
    console.log({ err });
  }
});

router.get('/existing-shoutouts', async (req, res) => {
  try {
    const shoutouts = await slackController.getExisting();
    let successful = true;

    for (let i = 0; i < shoutouts.length; i++) {
      const insertsSuccess = await insertIntoDb(
        shoutouts[i],
        shoutouts[i].date
      );
      if (!insertsSuccess) successful = false;
    }

    if (successful) res.status(201).json({ msg: 'Added' });
    else res.status(401).json({ msg: 'not all added' });
  } catch (err) {
    console.log({ err });
  }
});

const insertIntoDb = async (data, date) => {
  const {
    channel_name,
    company_value,
    shoutee_slack_id,
    shouter_slack_id,
    shoutout,
  } = parseReqData(data);

  const companyValueId = await slackController.findorCreateCompanyValue(
    company_value
  );
  const shouteeId = await slackController.findOrCreateUser(shoutee_slack_id);
  const shouterId = await slackController.findOrCreateUser(shouter_slack_id);

  const shoutOutId = await slackController.addShoutout(
    date,
    channel_name,
    companyValueId,
    shouteeId,
    shouterId,
    shoutout
  );

  return companyValueId[0] && shouteeId[0] && shouterId[0] && shoutOutId[0];
};

module.exports = router;
