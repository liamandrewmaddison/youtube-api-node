const bookshelf = require('../database');

const Videos = bookshelf.Model.extend({
    tableName: 'videos',
});

module.exports = Videos;