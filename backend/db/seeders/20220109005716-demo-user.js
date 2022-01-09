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
        email: 'demo1@user.io',
        username: 'demo1',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'demo2@user.io',
        username: 'demo2',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['demo', 'demo1', 'demo2'] }
    }, {});
  }
};
