const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Settings = require('../../models/Settings');
const User = require('../../models/User');

// @route POST api/settings
// @desc Create a track
// @access Private
router.post('/', auth,
  async (req, res) => {
    try {
      const newSettings = new Settings({
        area: req.body.area,
        title: req.body.title,
        text: req.body.text
      });

      const settings = await newSettings.save();

      res.json(settings);
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
    const setting = await Setting.findById(req.params.id);

    if (!setting) {
      return res.status(404).json({ msg: 'Setting not found' });
    }

    res.json(setting);
  } catch(err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Setting not found' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/settings/:id
// @desc Edit lesson
// @access Private

router.patch('/:id', auth, async (req, res) => {

      const { area, title, text } = req.body;

      // build profile object
      const settingsFields = {};
      if (area) settingsFields.area = area;
      if (title) settingsFields.title = title;
      if (text) settingsFields.text = text;

      let settings = await Settings.findById(req.params.id);

          settings = await Settings.findByIdAndUpdate(
            req.params.id,
            { $set: settingsFields },
            { new: true }
          )

          console.log(settingsFields)
          res.json(settings)
      });

router.get('/', async (req, res) => {
  try {
    const settings = await Settings.find();
    res.json(settings);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
