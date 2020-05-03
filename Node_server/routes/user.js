const router = require('express').Router();
const User = require('../models/User');

router.post('/update', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      user: {
        _id: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
