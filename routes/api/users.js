const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/users
// @desc Register account
// @access Public
router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists.' }]
        });
      }

      user = new User({
        name,
        email,
        password,
        role
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt)

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token) => {
          if (err) throw err;
          res.json({ token })
        }
      );
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

});

module.exports = router;
