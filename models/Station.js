const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Station extends Model {}

Station.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    charger_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level_type: {
       type:DataTypes.STRING,
       allowNull: false,
    },
    reservation_counts: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    minimum_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'station',
  }
);

module.exports = Station;
