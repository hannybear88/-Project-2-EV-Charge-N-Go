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
    plug_in_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    station_type: {
       type:DataTypes.STRING,
       allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(7,4),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(7,4),
      allowNull: false,
    },
    // reservation_counts: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // price: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    // },
    // minimum_time: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
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
