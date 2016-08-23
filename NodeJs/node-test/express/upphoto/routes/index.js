var express = require("express");
var router = express.Router();
var Photo = require("../models/photo");
var fs = require("fs");
var path = require("path");

/* GET home page. */
router.route("/")
	.get(function(req, res, next) {
		Photo.find({}, function(err, photos) {
			if (err) return next(err);

			res.render("index", {
				title: "Photos",
				photos: photos
			});
		});
	})
	.post(function(req, res, next) {
		var name = req.body.name;
		Photo.remove({
				path: name
			},
			function(err) {
				if (err) return next(err);
				console.log(name + "removed");
				res.json({
					"ok": true
				});
				fs.unlink(path.join(req.app.get("static"), name), function(err) {
					if (err) return next(err);
				});
			}
		);
	});
router.get("/photo/:id/download", function(req, res, next) {
	var id = req.params.id;
	Photo.findById(id, function(err, photo) {
		if (err) return next(err);
		var url = path.join(req.app.get("static"), photo.path);
		res.download(url, photo.name + ".jpg");
	});
});
module.exports = router;