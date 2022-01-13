'use strict'
const faker = require('faker')
const bcrypt = require('bcryptjs')

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
   return queryInterface.bulkInsert('Users', [
    {
      email: 'demo@user.io',
      username: 'Demo',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'kreston@demo.com',
      username: 'Kreston',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'gage@demo.com',
      username: 'Gage',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'tyrique@demo.com',
      username: 'Tyrique',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: "jordan@demo.com",
      username: 'Michael Jordan',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'drake@demo.com',
      username: 'DrakeOVO',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: "kim@demo.com",
      username: 'Kim Kardashian',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'barack@demo.com',
      username: 'Barack Obama',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'rock@demo.com',
      username: 'The Rock',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: "beyonce@demo.com",
      username: 'Beyoncé',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'jen@demo.com',
      username: 'Jennifer Lawrence',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'miley@demo.com', 
      username: 'Miley Cyrus',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: "kanye@demo.com",
      username: 'Kanye West',
      hashedPassword: bcrypt.hashSync('password')
    },
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Users',  null, {})
  }
}
