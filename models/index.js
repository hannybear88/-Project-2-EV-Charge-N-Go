const User = require('./User');
const Station = require('./Station');
const Reservation = require('./Reservation');
const Wishlist = require('./Wishlist');

// one to many relationship for user(owner) and station
User.hasMany(Station, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});
Station.belongsTo(User, {
  foreignKey: 'owner_id'
});

// many to many relationship for user(renter) and station
User.belongsToMany(Station, {
  through: {
    model: Reservation,
    unique: false
  },
  as: 'reserved_stations'
});
Station.belongsToMany(User, {
  through: {
    model: Reservation,
    unique: false
  },
  as: 'renters'
});

//-------Future add on--------//

// User.belongsToMany(Station, {
//   through: {
//     model: Wishlist,
//     unique: false
//   },
// });

// Station.belongsToMany(User, {
//   through: {
//     model: Wishlist,
//     unique: false
//   }
// });

module.exports = { User, Station, Reservation };