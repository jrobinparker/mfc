const express = require('express');
const router = express.Router();

// @route GET api/lessons
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Lessons route'));

module.exports = router;
