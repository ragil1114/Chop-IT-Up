<<<<<<< HEAD
// import the Sequelize constructor from the library
=======
>>>>>>> 1fc25328be85b74b5372923267b48179a0657dd8
const Sequelize = require('sequelize');

require('dotenv').config();

<<<<<<< HEAD

// create connection to our database, pass in your MySQL information for 
// username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, 
                                process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3001
});

=======
// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });
>>>>>>> 1fc25328be85b74b5372923267b48179a0657dd8

module.exports = sequelize;