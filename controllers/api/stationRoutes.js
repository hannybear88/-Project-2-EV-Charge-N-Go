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

module.exports = router;
