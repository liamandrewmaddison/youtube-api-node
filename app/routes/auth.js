const express = require("express");
const router = express.Router();
const youtubeController = require("../controllers/youtube");

router.get("/profile", (req, res) => {
    const youtube = youtubeController.getChannelIds();
    
    // youtube.search.list({
    //     part: "snippet",
    //     q: "your search query"
    // }, (err, data) => {
    //     if (data) {
    //       console.log(data);
    //       res.send(data);
    //     }
    // });
});

module.exports = router;