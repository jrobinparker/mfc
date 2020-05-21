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
router.post('/', [ auth, [
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

// @route GET api/lessons
// @desc Get all lessons
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ date: -1 });
    res.json(lessons);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/lessons/:id
// @desc Get lesson by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found' });
    }

    res.json(lesson);
  } catch(err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lesson not found' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
