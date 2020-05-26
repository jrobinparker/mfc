const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Track = require('../../models/Track');
const Lesson = require('../../models/Lesson');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/tracks
// @desc Create a track
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

      const newTrack = new Track({
        user: req.user.id,
        title: req.body.title,
        author: user.name,
        description: req.body.description,
        style: req.body.style,
        rank: req.body.rank,
        lessons: req.body.lessons
      });

      const track = await newTrack.save();

      res.json(track);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// @route GET api/tracks
// @desc Get all tracks
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const tracks = await Track.find().sort({ date: -1 });
    res.json(tracks);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/tracks/:id
// @desc Get track by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).json({ msg: 'Track not found' });
    }

    res.json(track);
  } catch(err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Track not found' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
