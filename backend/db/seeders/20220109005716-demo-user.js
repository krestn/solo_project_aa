'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'demo',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'test@user.io',
        username: 'test',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'kreston@user.io',
        username: 'kreston',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['demo', 'test', 'kreston'] }
    }, {});
  }
};
