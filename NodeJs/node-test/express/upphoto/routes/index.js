var express = require('express');
var router = express.Router();
var Photo = require("../models/photo");

/* GET home page. */
router.get('/', function(req, res, next) {
    Photo.find({}, function(err, photos) {
        if(err) return next(err);

        console.log(photos);
        res.render("index", {
            title: "Photos",
            photos: photos
        });
    });
});

module.exports = router;