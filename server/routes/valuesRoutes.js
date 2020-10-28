const express = require('express');
const router = express.Router();
const valuesController = require('../controllers/valuesController');

router.put('/update-value', async (req, res) => {
  try {
    const updatedValue = await valuesController.updateValue(req.body);
    res.status(200).json(updatedValue);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
