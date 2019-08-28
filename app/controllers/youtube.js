const youtube = require("youtube-api");
const config = require("../../config")("youtube");
const fs = require("fs-extra");

const ourYoutubeChannels = [
    'GlobalCyclingNetwork',
    'globalmtb',
];

/**
 * Get Client
 * 
 * Returns our authenticated client SDK
 * @returns youtube{}
 */
function getClient() {
    youtube.authenticate({
        type: "key",
        key: config.apiKey
    });

    return youtube;
}

/**
 * Get filter file
 * 
 * Retrieves the filter file and 
 * @returns Array[]
 */
function getFilterFile() {
    const file = config.searchFilterFile;
    const data = fs.readFileSync(file, 'utf8');
    
    return data.toString().split("\n");
}


/**
 * Get channel ids
 */
function getChannelIds() {
    const youtube = getClient();
    const filters = getFilterFile();
    console.log(config);
    console.log(filters);

    // const channel1 = youtube.videos.list({
    //     part: "snippet,contentDetails,statistics",
    //     id: "UC_A--fhX5gea0i4UtpD99Gg,UCuTaETsuCOkJ0H_GAztWt0Q",
    // }).then((res) => {
    //     console.log(res);
    // });
    // const channel2 = youtube.videos.list({
    //     part: "snippet",
    //     forUsername: "globalmtb",
    //     type:'video'
    // }, (err, data) => {
    //     console.log(err);
    //     console.log(data.items[0].snippet);
    // });
}

module.exports = {
    getChannelIds,
};