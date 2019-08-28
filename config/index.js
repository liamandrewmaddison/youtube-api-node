/**
 * CONFIG/INDEX
 * 
 * This is our base configuration file
 */
 
// intitialize our environment vars
require('dotenv').config();

const youtube = require('./youtube');
const database = require('./database');

const config = {
  youtube,
  database,
};

module.exports = (configToReturn = '') => {
  if (!configToReturn) {
    return config;
  }

  return config[configToReturn];
};