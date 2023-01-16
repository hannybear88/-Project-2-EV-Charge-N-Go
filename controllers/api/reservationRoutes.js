const router = require('express').Router();
const { Project } = require('../../models');
// const withAuth = require('../../utils/auth');


router.post('/reservation', async (req, res) => {
  try {
    const makereserve = await User.findOne({ where: { datereserve: req.body.datereserve } });

    if (!makereserve) {
      res
        .status(400)
        .json({ message: 'Incorrect date or length, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.station_id = stationData.id;
      req.session.user_id = reservation.id;
      req.session.logged_in = true;
      
      res.json({ station: stationData, message: 'You have successfully reserved!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
