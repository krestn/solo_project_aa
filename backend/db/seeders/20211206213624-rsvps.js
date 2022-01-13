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
   return queryInterface.bulkInsert('RSVPs', [
     {
      eventId: 1,
      userId: 2
    },
     {
       eventId: 1,
       userId: 5
     },
     {
      eventId: 2,
      userId: 6
    },
    {
      eventId: 2,
      userId: 11
    },
    {
      eventId: 2,
      userId: 12
    },
    {
      eventId: 3,
      userId: 1
    },
    {
      eventId: 3,
      userId: 5
    },
    {
      eventId: 3,
      userId: 7
    },
    {
      eventId: 3,
      userId: 9
    },
    {
      eventId: 3,
      userId: 10
    },
    {
      eventId: 4,
      userId: 4
    },
    {
      eventId: 4,
      userId: 5
    },
    {
      eventId: 4,
      userId: 7
    },
    {
      eventId: 4,
      userId: 9
    },
    {
      eventId: 4,
      userId: 10
    },
    {
      eventId: 5,
      userId: 13
    },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('RSVPs', null, {});
      */
   return queryInterface.bulkDelete('RSVPs', null, {});
  }
};
