const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  const { user, products, total } = req.body;
  try {
    const order = new Order({ user, products, total });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
