const router = require('express').Router();
const { Station, User } = require('../models');
const withAuth = require('../utils/auth');

// GET '/'
// Render the homepage
router.get('/', async (req, res) => {
  res.render('homepage', {logginIn: false});
});


module.exports = router;
