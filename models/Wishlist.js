const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Wishlist model
class Wishlist extends Model {}

//-------Future add on--------//

// fields/columns for Wishlist model

Wishlist.init(
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
        model: 'station',
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
    modelName: 'wishlist'
  }
);

module.exports = Wishlist;
