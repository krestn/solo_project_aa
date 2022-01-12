'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.INTEGER
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
    Venue.hasMany(models.Event, { foreignKey: 'userId' });
    

  };
  return Venue;
};
