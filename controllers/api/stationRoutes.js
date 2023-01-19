const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');
const {Station} = require('../../models');

// POST /api/station/
// Create a new station
router.post('/', withAuth, async (req, res) => {
  try {
    const newStation = await Station.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newStation);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE /api/station/:id
// Delete a station
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const stationData = await Station.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!stationData) {
      res.status(404).json({ message: `No station found with id=${req.params.id}!` });
      return;
    }

    res.status(200).json(stationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/station/:id
// Get a station by id
router.get("/:id", withAuth, async (req,res) => {
  const station_id = req.params.id;
  try {
    // Find the station by id and include its reservations
    const dbStationData = await Station.findOne({
      where: { id: station_id },
      include: [{ model: Reservation }],
    });
    // Serialize data so the template can read it
    const station = dbStationData.get({ plain: true });
    console.log(station);
    // Pass serialized data and session flag into template
    res.render("station_reservations", {
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
