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
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /newStation
router.get('/newStation', async (req,res) => {
  res.render("newStation", {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
    user_id: req.session.user_id,
  });
});

// myReservations
router.get("/myReservations", async (req,res) => {
  try {
    // Get all reservations for the logged in user
    const reserveData = await Reservation.findAll({
      where: {
        user_id: req.session.user_id
      },
      //include: [ {model: Station}]
      //include: [ {model: User} ],
    });
    // Serialize data so the template can read it
    const reservations = reserveData.map((reservation)=>reservation.get({ plain: true }));
    console.log(reservations);
    // Pass serialized reservations data into template
    res.render("myReservations", {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
      reservations: reservations
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







// router.get('/newReservation', async (req, res) => {
//   if (!req.session.logged_in) {
//     res.redirect("/login");
//     return;
//   }
//   res.render('newReservation', {
//     logged_in: req.session.logged_in,
//     user_name: req.session.user_name,
//     user_id: req.session.user_id,
//   });
// });

// router.get('/register', async (req, res) => {
//   if (!req.session.logged_in) {
//     res.redirect("/login");
//     return;
//   }
//   res.render('register', {
//     logged_in: req.session.logged_in,
//     user_name: req.session.user_name,
//   });
// });

// router.get('/myReservations', async (req, res) => {
//   if (!req.session.logged_in) {
//     res.redirect("/login");
//     return;
//   }
//   try {
//     const dbReservationData = await Reservation.findAll({
//       where: { user_id: req.session.user_id },
//     })
//     const dbStationData = await Station.findAll({
//     })

//     // Serialize data so the template can read it
//     const reservations = dbReservationData.map((reservation)=>reservation.get({ plain: true }));
//     const stations = dbStationData.map((station)=>station.get({ plain: true }));
//     console.log(stations)
//     res.render("myReservations", {
//       stations,
//       reservations,
//       logged_in: req.session.logged_in,
//       user_name: req.session.user_name,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
