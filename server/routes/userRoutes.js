const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/all-users', async (req, res) => {
  try {
    const users = await userController.getAllUsers();

    if (users.length) res.status(200).json(users);
    else res.status(204).json('No Content');
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/all-users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const start_date = req.query['start-date'];
    const end_date = req.query['end-date'];
    const user = await userController.getSingleUser(
      userId,
      start_date,
      end_date
    );
    if (user.id) res.status(200).json(user);
    else res.status(204).json('No Content');
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
