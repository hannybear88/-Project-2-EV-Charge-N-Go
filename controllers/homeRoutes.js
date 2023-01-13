const router = require('express').Router();
const { Station, User } = require('../models');
const withAuth = require('../utils/auth');
require('dotenv').config();

// GET '/'
// GET all charging stations and render for homepage
router.get("/", async (req, res) => {
  try {
    // Get all charging stations
    const dbStationData = await Station.findAll();

    // Serialize data so the template can read it
    const stations = dbStationData.map((station) => station.get({ plain: true }));
    const stationsJS = JSON.stringify(stations);

    // Pass serialized stations data, API key and session info into template
    res.render("homepage", { 
      stations: stationsJS, 
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
      logged_in: req.session.logged_in, 
      user_name: req.session.user_name });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
