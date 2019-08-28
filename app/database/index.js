/**
 * DATABASE/INDEX
 * 
 * This is our base database connection file.
 * Here we require knex, our query builder which
 *  helps us manage our database queries
 * We use bookself to manage our data modeling,
 *  allowing to do great things!
 */

// initialize knex, our ORM
const config = require('../../config')('database');
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;