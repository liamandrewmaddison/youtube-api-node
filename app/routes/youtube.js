const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtube');

router.get('/populate-db', async (req, res) => {
    const ids = await youtubeController.populateDb();
    
    res.send(JSON.stringify(ids));
});

module.exports = router;