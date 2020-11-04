const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/all-users', async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.status(202).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
