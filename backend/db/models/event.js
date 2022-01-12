'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING(1250),
    capacity: DataTypes.INTEGER,
    private: DataTypes.STRING,
    date: DataTypes.STRING,
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.hasMany(models.Rsvp, { foreignKey: 'eventId' });
    Event.belongsTo(models.User, { foreignKey: 'hostId' });
    Event.belongsTo(models.Venue, { foreignKey: 'venueId' });


  };
  return Event;
};
