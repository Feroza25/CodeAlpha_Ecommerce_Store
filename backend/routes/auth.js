const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

/* ======================
   LOGIN (AUTO REGISTER)
====================== */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // 🔥 AUTO REGISTER IF USER NOT FOUND
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        name: email.split('@')[0],
        email,
        password: hashedPassword
      });

      await user.save();
    }

    // ✅ PASSWORD CHECK
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // ✅ JWT TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
