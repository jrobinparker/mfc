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

// @route PUT api/lessons/:id
// @desc Edit lesson
// @access Private

router.patch('/:id', [ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
    ]
  ], async (req, res) => {

    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, rank, description, style, skills, lessons } = req.body;

      // build profile object
      const trackFields = {};
      if (title) trackFields.title = title;
      if (lessons) trackFields.lessons = lessons;
      if (rank) trackFields.rank = rank;
      if (description) trackFields.description = description;
      if (style) trackFields.style = style;
      if (skills) {
        trackFields.skills = skills.split(',').map(skill => skill.trim());
      }

      let track = await Track.findById(req.params.id);

          track = await Track.findByIdAndUpdate(
            req.params.id,
            { $set: trackFields },
            { new: true }
          )

          console.log(trackFields)
          res.json(track)
})

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

// @route DELETE api/tracks/:id
// @desc Delete a track
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).json({ msg: 'Track not found' });
    }

    if (track.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await track.remove();

    res.json({ msg: 'Track deleted' });
  } catch(err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Track not found' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/tracks/like/:id
// @desc Like a track
// @access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
      const track = await Track.findById(req.params.id);

      if (track.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Track already liked!' });
      };

      track.likes.unshift({ user: req.user.id });

      await track.save();

      res.json(track.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/tracks/unlike/:id
// @desc Unlike a track
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
      const track = await Track.findById(req.params.id);

      if (track.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ msg: 'Track has not yet been liked!' });
      };

      const removeIndex = track.likes.map(like => like.user.toString()).indexOf(req.user.id)

      track.likes.splice(removeIndex, 1)

      await track.save();

      res.json(track.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/tracks/complete/:id
// @desc Complete a track
// @access Private
router.put('/complete/:id', auth, async (req, res) => {
  try {
      const track = await Track.findById(req.params.id);

      if (track.completes.filter(complete => complete.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Track already completed!' });
      };

      track.completes.unshift({ user: req.user.id });

      await track.save();

      res.json(track.completes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/tracks/uncomplete/:id
// @desc Uncomplete a track
// @access Private
router.put('/uncomplete/:id', auth, async (req, res) => {
  try {
      const track = await Track.findById(req.params.id);

      if (track.completes.filter(complete => complete.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ msg: 'Track has not yet been completed!' });
      };

      const removeIndex = track.completes.map(complete => complete.user.toString()).indexOf(req.user.id)

      track.completes.splice(removeIndex, 1)

      await track.save();

      res.json(track.completes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
