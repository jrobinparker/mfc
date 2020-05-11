const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator')

// @route GET api/profile/me
// @desc Get user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

    if (!profile) {
      return res.status(400).json({ msg: 'No profile found for this user.' })
    }

    res.json(profile);

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.')
  }
});

// @route POST api/profile
// @desc Create or update profile
// @access Private

router.post('/', [
    auth,
    [
      check('rank', 'Rank is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { rank, location, favStyles, skills, about } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (rank) profileFields.rank = rank;
    if (location) profileFields.location = location;
    if (favStyles) {
      profileFields.favStyles = favStyles.split(',').map(favStyle => favStyle.trim());
    }
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    if (about) profileFields.about = about;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields},
          { new: true }
        )

        return res.json(profile)
      }
      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;
