const sequelize = require('../config/connection');
const { User, Station } = require('../models');

const userData = require('./userData.json');
const stationData = require('./stationData.json');

seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // seed data for the table "user"
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // seed data for the table "post"
  for (const station of stationData) {
    await Station.create({
      ...station,
      owner_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  
  process.exit(0);
};

seedDatabase();