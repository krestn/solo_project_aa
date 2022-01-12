'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Venues', [
      {
        title: 'Wrigley Field',
        address: '1060 W Addison St',
        city: "Chicago",
        state: "IL", 
        zipcode: 60613
      },
      {
        title: 'Stan\'s Donuts',
        address: '3300 N Broadway',
        city: "Chicago",
        state: "IL",
        zipcode: 60657 
      },
      {
        title: 'Starbucks',
        address: '3649 N Clark St',
        city: "Chicago",
        state: "IL",
        zipcode: 60613
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      title: { [Op.in]: ['Wrigley Field', 'Stan\'s Donuts', 'Starbucks'] }
    }, {});
  }
};
