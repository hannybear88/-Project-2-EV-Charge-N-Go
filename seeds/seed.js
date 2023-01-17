const sequelize = require('../config/connection');
const { User, Station, Reservation } = require('../models');

const userData = require('./userData.json');
const stationData = require('./stationData.json');
const reservationData = require('./reservationData.json');

seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // seed data for the table "user"
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // seed data for the table "station"
  const stations = await Station.bulkCreate(stationData, {
    individualHooks: true,
    returning: true,
  });

  // seed data for the table "reservation"
  const reservations = await Reservation.bulkCreate(reservationData, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
};

seedDatabase();