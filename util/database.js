const Sequelize = require('sequelize');

const sequelize = new Sequelize('defaultdb', 'avnadmin', 'AVNS_fnUAbZIB-hXi9ESZMfm', {
    host: 'mysql-33ac2037-jdrmart.a.aivencloud.com',
    port: 11655,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  module.exports = sequelize;