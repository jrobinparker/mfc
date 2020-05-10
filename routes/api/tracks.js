const express = require('express');
const router = express.Router();

// @route GET api/tracks
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Tracks route'));

module.exports = router;
