const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await userController.getAdmin(email, password);
    if (admin[0]) {
      const adminInfo = {
        avatar: 'https://static.toiimg.com/photo/76729750.cms',
        email: admin[0].email,
        first_name: admin[0].first_name,
        last_name: admin[0].last_name,
        role: admin[0].role,
      };
      res.status(202).json(adminInfo);
    } else res.status(403).json('Email or password is incorrect');
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
