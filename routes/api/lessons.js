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
        description: req.body.description,
        style: req.body.style,
        rank: req.body.rank
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

// @route DELETE api/lessons/:id
// @desc Delete a lesson
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found' });
    }

    if (lesson.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await lesson.remove();

    res.json({ msg: 'Lesson deleted' });
  } catch(err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lesson not found' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/lessons/like/:id
// @desc Like a lesson
// @access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
      const lesson = await Lesson.findById(req.params.id);

      if (lesson.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Lesson already liked!' });
      };

      lesson.likes.unshift({ user: req.user.id });

      await lesson.save();

      res.json(lesson.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/lessons/unlike/:id
// @desc Unlike a lesson
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
      const lesson = await Lesson.findById(req.params.id);

      if (lesson.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ msg: 'Lesson has not yet been liked!' });
      };

      const removeIndex = lesson.likes.map(like => like.user.toString()).indexOf(req.user.id)

      lesson.likes.splice(removeIndex, 1)

      await lesson.save();

      res.json(lesson.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/lessons/complete/:id
// @desc Complete a lesson
// @access Private
router.put('/complete/:id', auth, async (req, res) => {
  try {
      const lesson = await Lesson.findById(req.params.id);

      if (lesson.completes.filter(complete => complete.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Lesson already completed!' });
      };

      lesson.completes.unshift({ user: req.user.id });

      await lesson.save();

      res.json(lesson.completes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/lessons/uncomplete/:id
// @desc Uncomplete a lesson
// @access Private
router.put('/uncomplete/:id', auth, async (req, res) => {
  try {
      const lesson = await Lesson.findById(req.params.id);

      if (lesson.completes.filter(complete => complete.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ msg: 'Lesson has not yet been completed!' });
      };

      const removeIndex = lesson.completes.map(complete => complete.user.toString()).indexOf(req.user.id)

      lesson.completes.splice(removeIndex, 1)

      await lesson.save();

      res.json(lesson.completes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/lessons/comment/:id
// @desc Add a comment to a lesson
// @access Private
router.post('/comment/:id', [ auth, [
    check('text', 'Comment text is required').not().isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const lesson = await Lesson.findById(req.params.id);

      const newComment = {
        user: req.user.id,
        author: user.name,
        text: req.body.text
      };

      lesson.comments.unshift(newComment);

      await lesson.save();

      res.json(lesson.comments);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// @route DELETE api/lessons/comment/:id/:comment_id
// @desc Delete comment
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    const comment = lesson.comments.find(comment => comment.id === req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = lesson.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

    lesson.comments.splice(removeIndex, 1);

    await lesson.save();

    res.json(lesson.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;
