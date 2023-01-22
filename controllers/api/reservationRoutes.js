const router = require('express').Router();
const { Reservation } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/reservations
// Create a new reservation
router.post('/', withAuth, async (req, res) => {
  try{
    const reserveData = await Reservation.create(req.body);
    
    res
      .status (200)
      .json(reserveData);
  } catch (err) {
    res.status (400).json(err);
  }
});

// DELETE /api/reservation/:id
// Delete a reservation
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reserveData = await Reservation.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reserveData) {
      res.status(404).json({ message: `No reservation found with id=${req.params.id}!` });
      return;
    }

    res.status(200).json(reserveData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
