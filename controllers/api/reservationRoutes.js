const router = require('express').Router();
const { Project } = require('../../models');
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
    // req.session.save(() => {
    //     req.session.reservation_id = reserveData.id;
    //     req.session.reservation_date = reserveData.date;
    //     req.session.reservation_length = reserveData.length;
    //     req.session.logged_in = true;
        
      
    //       // .json({ message: 'You have successfully reserved!' });
    // });
  } catch (err) {
    res.status (400).json(err);
  }
});
  

module.exports = router;
