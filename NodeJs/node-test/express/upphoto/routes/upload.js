var express = require("express");
var router = express.Router();
var Photo = require("../models/photo");
var path = require("path");
var fs = require("fs");

var app = express();

/* GET users listing. */
router.route("/")
	.post(function(req, res, next) {
		var dir = req.app.get("photos");
		var img = req.files.photofile;
		var name = req.body.photo.name || img.name;
		var imgUrl = path.join(dir, img.name);
		var redir = path.relative(req.app.get("static"), imgUrl);
		fs.rename(img.path, imgUrl, function(err) {
			if (err) return next(err);

			Photo.create({
				name: name,
				path: redir
			}, function(err) {
				if (err) return next(err);

				res.redirect("/");
				//res.end("end");
			});
		});
	})
	.get(function(req, res, next) {
		var dir = req.app.get("photos");
		res.render("upload");
	});


module.exports = router;