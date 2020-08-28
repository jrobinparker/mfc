const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const path = require('path');
const fs = require('fs');
const request = require('request');
const crypto = require('crypto');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const GridStore = mongo.GridStore;
const ObjectID = require('mongodb').ObjectID;
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const ffmpeg = require('fluent-ffmpeg');
const Lesson = require('../../models/Lesson');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Mongo URI
const uri = "mongodb+srv://mfc-online-admin:mfcAdmin0520@mfc-online-db-c7fzs.mongodb.net/test?retryWrites=true&w=majority";

// Create mongo connection
const conn = mongoose.createConnection(uri);

// Init gfs
let videos, thumbs;

conn.once('open', () => {
  // Init stream
  videos = Grid(conn.db, mongoose.mongo);
  videos.collection('videos');

  thumbs = Grid(conn.db, mongoose.mongo);
  thumbs.collection('thumbnails');
});

// Initialize MongoDB connection once
mongoose.connect(uri, function(err, database) {
  if(err) throw err;
  db = database;
});

// Create video storage engine
const videoStorage = new GridFsStorage({
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

const videoUpload = multer({ storage: videoStorage });

// temp file storage
let tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "tmp/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const tempUpload = multer({ storage: tempStorage })

// Create thumbnail storage engine
const thumbStorage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'thumbnails'
        };
        resolve(fileInfo);
        console.log(fileInfo);
      });
    });
    console.log(req)
  }
});

const thumbUpload = multer({ storage: thumbStorage })


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

      const { title, rank, description, style, skills, about, video, thumbnail } = req.body;

      const lessonFields = {}

      lessonFields.user = user;
      lessonFields.author = user.name;
      lessonFields.title = title;
      lessonFields.description = description;
      lessonFields.video = video;
      lessonFields.thumbnail = thumbnail;
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
  videoUpload.single('video') ],
  async (req, res) => {
    const data = await res.json({ file: req.file })
  });

// @route POST api/lessons/temp-thumbnails
// @desc Create thumbnail from uploaded video
// @access Private
router.post("/temp-thumbnails", (req, res) => {

    let fileName, filePath, fileDuration

    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        fileDuration = metadata.format.duration
    });

    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log(filenames)
            fileName = filenames[0];
            filePath =  "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function (filenames) {
            console.log('Screenshots taken for ' + fileName);
            const returnFile = filePath.replace(/^.*[\\\/]/, '')
            res.json({ success: returnFile })
            uploadThumbnail(filePath)
        })
        .on('error', function (err) {
            console.error(err);
            return res.json({ success: false, err });
        })
        .screenshots({
            count: 1,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        });

});

function uploadThumbnail(filePath) {
  const formData = {
      file: fs.createReadStream(filePath),
  }
  request.post({url: 'https://modernfightingconcepts.herokuapp.com/api/lessons/thumbnails', formData: formData},
    function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
  })
}

// @route POST api/lessons/thumbnails
// @desc Upload a video thumbnail
// @access Private
router.post('/thumbnails',
  thumbUpload.any(),
  async (req, res) => {
    const data = await res.json({ file: req.file })
  });
;

// @route GET /videos/:filename
// @desc Get video
router.get('/videos/:filename', (req, res) => {
  videos.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
  if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    /** Calculate Size of file */
      const { length } = file;
      const range = req.headers.range;
      /** Check for Range header */
      if (range) {
        /** Extracting Start and End value from Range Header */
        let [start, end] = range.replace(/bytes=/, "").split("-");
        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : length - 1;

        if (!isNaN(start) && isNaN(end)) {
          start = start;
          end = length - 1;
        }
        if (isNaN(start) && !isNaN(end)) {
          start = length - end;
          end = length - 1;
        }

        // Handle unavailable range request
        if (start >= length || end >= length) {
          // Return the 416 Range Not Satisfiable.
          res.writeHead(416, {
            "Content-Range": `bytes */${length}`
          });
          return res.end();
        }

        /** Sending Partial Content With HTTP Code 206 */
        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${length}`,
          "Accept-Ranges": "bytes",
          "Content-Length": end - start + 1,
          "Content-Type": "video/mp4"
        });

        let readstream = videos.createReadStream({
          _id: file._id,
          range: {
            startPos: start,
            endPos: end
          }
        });
        readstream.pipe(res);

      } else {

        let readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res)

      }

   }
)});

// @route GET /thumbnails/:filename
// @desc Get thumbnail
router.get('/thumbnails/:filename', (req, res) => {
  thumbs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = thumbs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
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
