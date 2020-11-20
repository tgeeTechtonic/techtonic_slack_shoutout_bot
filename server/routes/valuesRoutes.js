const express = require('express');
const router = express.Router();
const valuesController = require('../controllers/valuesController');
const { verifyRequest } = require('../middleware');

router.get('/company-values', async (req, res) => {
  try {
    const companyValues = await valuesController.getAllValues();

    if (companyValues.length) res.status(200).json(companyValues);
    else res.status(204).json('No Content');
  } catch (err) {
    res.status(500).json({ err });
  }
})

router.put('/update-value', verifyRequest, async (req, res) => {
  try {
    const updatedValue = await valuesController.updateValue(req.body);

    if (updatedValue.length) res.status(200).json(updatedValue[0]);
    else res.status(400).json('Update not successful');
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
