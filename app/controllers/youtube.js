var { google } = require('googleapis');
const config = require('../../config')('youtube');
const fs = require('fs-extra');

/**
 * Get Client
 * 
 * Returns our authenticated client SDK
 * @returns {youtube}
 */
function __getClient() {
    const youtube = google.youtube({
        version: 'v3',
        auth: config.apiKey
    });

    return youtube;
}

/**
 * Get filter file
 * 
 * Retrieves the filter file and 
 * @returns {Array}
 */
function __getFilterFileConfig() {
    const file = config.searchFilterFile;
    const data = fs.readFileSync(file, 'utf8');
    
    return data.toString().split("\n");
}

/**
 * Get channels
 * 
 * Gets all channels from our list in our config
 * @returns {Array[Promise]}
 */
function __getChannels() {
    const youtube = __getClient();
    
    return config.channels.map(forUsername => {
        return youtube.channels.list({ part: 'snippet', forUsername });
    });
}

/**
 * Get channel ids
 * 
 * Gets a our id's from our channel list
 * @returns {array} [ids]
 */
async function __getChannelIds() {
    const res = await Promise.all(__getChannels());

    return res.map(channel => channel.data.items[0].id);
}

/**
 * Search from channels by filters
 * 
 * Queries youtube by our channelIds and filter file
 */
async function __searchFromChannelsByFilters() {
    const youtube = __getClient();
    const filters = __getFilterFileConfig();
    const channelIds = await __getChannelIds();

    const searchArray = filters.map(filter => {
        const search = channelIds.map(channelId => {
            return youtube.search.list({
                part: 'snippet',
                channelId,
                q: filter,
            });
        });

        return search;
    });

    searchArray.flat(Infinity);

    return searchArray;
}

/**
 * Populate DB
 */
async function populateDb() {
    const results = await Promise.all(__searchFromChannelsByFilters());

    console.log(results);
}

module.exports = {
    populateDb,
};