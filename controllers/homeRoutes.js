const router = require('express').Router();
const { Station, User } = require('../models');
const withAuth = require('../utils/auth');
require('dotenv').config();

// GET '/'
// Render the homepage
router.get('/', async (req, res) => {
  res.render('homepage', {
    logged_in: false,
    apiKey: process.env.GOOGLE_MAPS_API_KEY
  });
});


module.exports = router;
