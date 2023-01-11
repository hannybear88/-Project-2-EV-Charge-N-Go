const User = require('./User');
const Station = require('./Station');
const Reservation = require('./Reservation');
const Wishlist = require('./Wishlist');

User.hasMany(Station, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Station.belongsTo(User, {
  foreignKey: 'owner_id'
});

User.belongsToMany(Station, {
  through: {
    model: Reservation,
    unique: false
  }
});

Station.belongsToMany(User, {
  through: {
    model: Reservation,
    unique: false
  }
});

User.belongsToMany(Station, {
  through: {
    model: Wishlist,
    unique: false
  }
});

Station.belongsToMany(User, {
  through: {
    model: Wishlist,
    unique: false
  }
});

module.exports = { User, Station, Reservation, Wishlist };