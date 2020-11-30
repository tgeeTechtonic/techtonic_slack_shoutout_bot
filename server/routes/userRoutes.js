const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/all-users', async (req, res) => {
  try {
    const start_date = req.query['start-date'];
    const end_date = req.query['end-date'];
    const users = await userController.getAllUsers(start_date, end_date);

    if (users.length) res.status(200).json(users);
    else res.status(204).json('No Content');
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
