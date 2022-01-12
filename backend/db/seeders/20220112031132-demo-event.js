'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        hostId: 1,
        venueId: 1,
        title:"Cub's Game!!!",
        description: "Cub's are playing the St. Louis Cardinals this Friday! Come join the Chicago Bull's help cheer on the hometown team from the Left Field rooftops!",
        capacity: 35,
        private: "yes",
        date: "May 5th, 2022 @ 7:30 p.m.", 
      },
      {
        hostId: 2,
        venueId: 3,
        title: "Open Invite Book Club",
        description: "Come join the club! Free wine and cheese! BYOB(bring your own book).",
        capacity: 10,
        private: "no",
        date: "September 3rd, 2022 @ 6pm",
      },
      {
        hostId: 3,
        venueId: 2,
        title: "Grand Opening! Free Donuts!",
        description:"The title says it all! FREE DONUTS, first 100 customers(limit 2 per customer).",
        capacity:"100",
        private: "no",
        date: 'Februaru 7th. 2022 @ 9am',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      venueId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
