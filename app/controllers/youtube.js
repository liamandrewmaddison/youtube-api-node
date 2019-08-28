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
 * @returns {array}
 */
function __getFilterFile() {
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
function __getChannels(index) {
    const youtube = __getClient();
    
    return config.channels.map((forUsername) => {
        return youtube.channels.list({ part: 'id', forUsername });
    });
}


/**
 * Get channel ids
 * 
 * Gets a our id's from our channel list
 * @returns {array} [ids]
 */
async function getChannelIds() {
    const res = await Promise.all(__getChannels());

    return res.map((channel) => channel.data.items[0].id);
}

module.exports = {
    getChannelIds,
};