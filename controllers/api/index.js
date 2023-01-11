const router = require('express').Router();
const userRoutes = require('./userRoutes');
const stationRoutes = require('./stationRoutes');
const reservationRoutes = require('./reservationRoutes');

router.use('/users', userRoutes);
router.use('/projects', stationRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;
