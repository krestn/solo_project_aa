'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
   return queryInterface.bulkInsert('Events', [
     {
      hostId: 2,
      name: 'Pool Party!',
      location: 'Calabasas, CA',
      details: 'Invite Only!',
      date: 'June 30, 2022',
      time: '8:00pm'
    },
    {
      hostId: 3,
      name: 'ProjectX',
      location: 'Phoenix, AZ',
      details: 'Invite Only',
      date: 'July 19, 2022',
      time: '9:00pm'
    },
    {
      hostId: 4,
      name: 'Bel-Air Barmitzvah',
      location: 'Los Angeles, CA',
      details: 'Invite Only',
      date: 'July 22, 2022',
      time: '3:00pm'
    },
    {
      hostId: 8,
      name: 'Grand Ball',
      location: 'Madrid, Spain',
      details: 'Invite Only',
      date: 'September 25, 2022',
      time: '11:00am'
    },
    {
      hostId: 2,
      name: 'Rooftop Art Show',
      location: 'Chicago, IL',
      details: 'Invite Only',
      date: 'October 3, 2022',
      time: '9:00pm'
    },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
   return queryInterface.bulkDelete('Events', null, {});
  }
};
