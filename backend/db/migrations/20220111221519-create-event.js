'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users" },


      },
      venueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Venues"},


      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      private: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),

      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};
