const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', async (req, res) => {
  const { email: adminEmail, password: adminPassword } = req.body;
  try {
    const [
      { avatar, email, first_name, last_name, role },
    ] = await userController.verifyAdmin(adminEmail, adminPassword);

    if (role === 'admin') {
      res.status(202).json({
        avatar,
        email,
        first_name,
        last_name,
        role,
      });
    } else res.status(401).json('Email or password is incorrect');
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.put('/update-admin', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let [admin] = await userController.getAdmin(email);
    admin.role = role;
    admin.password = password;
    const [updatedAdmin] = await userController.updateAdmin(admin);

    if (updatedAdmin) {
      res.status(202).json(updatedAdmin);
    } else res.status(400).json('Update not successful');
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
