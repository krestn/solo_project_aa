'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    details: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey: 'hostId' })

    const columnMapping = {
      through: 'RSVP',
      foreignKey: 'eventId',
      otherKey: 'userId'
    }

    Event.belongsToMany(models.User, columnMapping)
  };
  return Event;
};
