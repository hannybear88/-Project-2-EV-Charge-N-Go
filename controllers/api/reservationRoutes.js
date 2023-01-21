const router = require('express').Router();
const { Reservation } = require('../../models');
// const withAuth = require('../../utils/auth');

// POST /api/reservations
// Create a new reservation
router.post('/', async (req, res) => {
  try{
    console.log(req.body);
    const reserveData = await Reservation.create(req.body);
    
    res
      .status (200)
      .json(reserveData);
  } catch (err) {
    res.status (400).json(err);
  }
});
  

module.exports = router;
