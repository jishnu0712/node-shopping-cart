const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'jishnudev', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  module.exports = sequelize;