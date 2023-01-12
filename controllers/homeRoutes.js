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

router.get('/login', async (req, res) => {
  res.render('login') 
});

router.get('/signup', async (req,res) => {
  res.render('signup')
});

router.get('/logout'), async (req,res) => {
  res.render('logout')
};

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');



module.exports = router;
