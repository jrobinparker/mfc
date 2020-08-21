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
      const user = await User.findById(req.user.id).select('-password');

      const newSettings = new Settings({
        dojo: req.body.dojo,
        about: req.body.about,
      });

      const settings = await newSettings.save();

      res.json(settings);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// @route PUT api/settings/:id
// @desc Edit lesson
// @access Private

router.patch('/:id', auth, async (req, res) => {

      const { dojo, about } = req.body;

      // build profile object
      const settingsFields = {};
      if (dojo) settingsFields.dojo = dojo;
      if (about) settingsFields.about = settings;

      let settings = await Settings.findById(req.params.id);

          settings = await Settings.findByIdAndUpdate(
            req.params.id,
            { $set: settingsFields },
            { new: true }
          )

          console.log(settingsFields)
          res.json(settings)
      });

module.exports = router;
