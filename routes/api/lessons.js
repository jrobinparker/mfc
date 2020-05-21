const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Lesson = require('../../models/Lesson');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route POST api/lessons
// @desc Create a lesson
// @access Private
router.get('/', [ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newLesson = new Lesson({
        user: req.user.id,
        title: req.body.title,
        author: user.name,
        description: req.body.description
      });

      const lesson = await newLesson.save();

      res.json(lesson);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

  });

module.exports = router;
