const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const path = require('path');

const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const Lesson = require('../../models/Lesson');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Mongo URI
const uri = "mongodb+srv://mfc-online-admin:mfcAdmin0520@mfc-online-db-c7fzs.mongodb.net/test?retryWrites=true&w=majority";

// Create mongo connection
const conn = mongoose.createConnection(uri);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('videos');
});

// Create storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'videos'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

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

      const { title, rank, description, style, skills, about, video } = req.body;

      const lessonFields = {}

      lessonFields.user = user;
      lessonFields.author = user.name;
      lessonFields.title = title;
      lessonFields.description = description;
      lessonFields.video = video;
      if (rank) lessonFields.rank = rank;
      if (style) lessonFields.style = style;
      if (skills) {
        lessonFields.skills = skills.split(',').map(skill => skill.trim());
      }

      const newLesson = new Lesson(lessonFields);

      const lesson = await newLesson.save();

      res.json(lesson);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// @route POST api/lessons/videos
// @desc Upload a video
// @access Private
router.post('/videos', [ auth,
  upload.single('video') ],
  async (req, res) => {
    const data = await res.json({ file: req.file })
    console.log(data);
  });

// @route GET /videos/:filename
// @desc Display Image
router.get('/videos/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Read output to browser
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
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
      const { title, rank, description, style, skills, video } = req.body;

      // build profile object
      const lessonFields = {};
      if (title) lessonFields.title = title;
      if (video) lessonFields.video = video;
      if (rank) lessonFields.rank = rank;
      if (description) lessonFields.description = description;
      if (style) lessonFields.style = style;
      if (skills) {
        lessonFields.skills = skills.split(',').map(skill => skill.trim());
      }

      let lesson = await Lesson.findById(req.params.id);

          lesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            { $set: lessonFields },
            { new: true }
          )

          console.log(lessonFields)
          res.json(lesson)
})

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

// @route PUT api/lessons/in-progress/:id
// @desc Log users who have not yet completed the lesson
// @access Private
router.put('/in-progress/:id', auth, async (req, res) => {
  try {
      const lesson = await Lesson.findById(req.params.id);
      const user = await User.findById(req.user.id).select('-password');

      if (lesson.inProgress.filter(ip => ip.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Lesson already in progress!' });
      };

      const newInProgress = {
        user: user,
        name: user.name
      };


      lesson.inProgress.unshift(newInProgress);

      await lesson.save();

      res.json(lesson.inProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/lessons/complete/:id
// @desc Complete a lesson and remove user from in-progress array
// @access Private
router.put('/complete/:id', auth, async (req, res) => {
  try {
      const lesson = await Lesson.findById(req.params.id);
      const user = await User.findById(req.user.id).select('-password');

      if (lesson.completes.filter(complete => complete.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Lesson already completed!' });
      };

      const newComplete = {
        user: user,
        name: user.name
      };

      lesson.completes.unshift(newComplete);

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
router.put('/remove-in-progress/:id', auth, async (req, res) => {
  try {
      const lesson = await Lesson.findById(req.params.id);

      if (lesson.inProgress.filter(ip => ip.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ msg: 'User has not started this lesson yet!' });
      };

      const removeIndex = lesson.inProgress.map(ip => ip.user.toString()).indexOf(req.user.id)

      lesson.inProgress.splice(removeIndex, 1)

      await lesson.save();

      res.json(lesson.inProgress);
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
