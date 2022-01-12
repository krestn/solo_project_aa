'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    private: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey: 'hostId' });
    Event.belongsTo(models.Venue, { foreignKey: 'venueId' });

  };
  return Event;
};
