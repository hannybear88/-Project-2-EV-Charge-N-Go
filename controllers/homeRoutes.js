const router = require("express").Router();
const { Station, User, Reservation } = require("../models");
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
    console.log(stations);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /newStation
router.get('/newStation', withAuth, async (req,res) => {
  res.render("newStation", {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
    user_id: req.session.user_id,
  });
});



// GET /myReservations
// Render the page with the user's reservations
router.get("/myReservations", withAuth, async (req,res) => {
  try {
    // find the logged in user by id and JOIN with rented Station data
    const dbUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Station, through: Reservation, as: "reserved_stations" }],
    });
    // Serialize data so the template can read it
    const user = dbUserData.get({ plain: true });
    // Pass serialized reservations data into template
    res.render("myReservations", {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
      reserved_stations: user.reserved_stations
    });
  } catch (err) {
    res.status(500).json(err); 
  };
})




// newReservation
router.get("/newReservation", (req,res) => {
  res.render("newReservation", {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
    user_id: req.session.user_id
  });
})

// GET /newReservations/:id
// Render the page for user to reserve a charging station (id)
router.get("/newReservation/:id", withAuth, async(req,res) => {
  const station_id = req.params.id;
  try {
    const dbStationData = await Station.findOne({
      where: { id: station_id },
    });
    // Serialize data so the template can read it
    const station = dbStationData.get({ plain: true });
    res.render("newReservation", {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
      station: station
    });
  } catch (err) {
    res.status(500).json(err);
  }

  
})
module.exports = router;
