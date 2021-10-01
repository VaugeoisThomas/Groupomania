'use strict';
const bcrypt = require('bcrypt');
const maskdata = require('maskdata');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: maskdata.maskEmail2('admin@groupomania.com'),
      password: await bcrypt.hash('Password09', 10),
      username: 'Admin',
      isAdmin: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
