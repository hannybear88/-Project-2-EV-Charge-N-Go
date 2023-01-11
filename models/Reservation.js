const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Reservation model
class Reservation extends Model {}

// fields/columns for Reservation model

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reservation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    reservation_length: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    Station_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Station',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'reservation'
  }
);

module.exports = Reservation;

