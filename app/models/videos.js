const bookshelf = require("../models/videos");

const Videos = bookshelf.Model.extend({
    tableName: 'videos',
});