const router = require("express").Router();
const { Station, User } = require("../models");
const withAuth = require("../utils/auth");
require("dotenv").config();



// GET '/'
// GET all charging stations and render for homepage
router.get("/", async (req, res) => {
  try {
    // Get all charging stations
    const dbStationData = await Station.findAll();

    // Serialize data so the template can read it
    const stations = dbStationData.map((station) =>
      station.get({ plain: true })
    );
    const stationsJS = JSON.stringify(stations);

    // Pass serialized stations data, API key and session info into template
    res.render("homepage", {
      stations: stationsJS,
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to the home route (/)
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
  });
});

// GET Sign Up page
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to the home route (/)
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup", {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
  });
});

// GET /logout
// Log user out and redirect the request to the / (homepage) route
router.get("/logout", withAuth, (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.get("/reservation", async (req, res) => {
  res.render("reservation", {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
    user_id: req.session.user_id,
  });
});

// GET /myStations
// Render the page with the user's charging stations
router.get("/myStations", withAuth, async (req, res) => {
  console.log("inside router.get('/myStations')");
  try {
    const dbStationData = await Station.findAll({
      where: { owner_id: req.session.user_id },
    })

    // Serialize data so the template can read it
    const stations = dbStationData.map((station)=>station.get({ plain: true }));
    res.render("myStations", {
      stations,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /newStation
// ......


module.exports = router;
