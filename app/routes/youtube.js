const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtube');

router.get('/ids', async (req, res) => {
    const ids = await youtubeController.getChannelIds();
    
    res.send(JSON.stringify(ids));
});

module.exports = router;