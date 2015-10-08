var express = require("express");
var router = express.Router();
var Photo = require("../models/photo");
var path = require("path");
var fs = require("fs");

var app = express();

var dir = app.get("photos");

/* GET users listing. */
router.get("/", function(req, res, next) {
	res.render("upload");
});
router.post("/", function(req, res, next) {
    var img = req.files.photo.image;
    var name = req.body.photo.name || img.name;
    var path = join(dir, img.name);
    console.log(name, img);
    fs.rename(img.path, path, function(err) {
        if(err) return next(err);

        Photo.create({
            name: name,
            path: img.name
        }, function(err) {
            if(err) return next(err);

            res.redirect("/");
        });
    });
});

module.exports = router;