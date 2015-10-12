var express = require("express");
var User = require("../models/m_user");
var bcrypt = require("bcryptjs");

var register;
var login;
register = {
	form: function(req, res, next) {
		res.render("register", {
			title: "register"
		});
	},
	submit: function(req, res, next) {
		var data = req.body.user;
		User.find({
			name: data.name
		}, function(err, user) {
			if (err) return next(err);
			if (user.id) {
				res.error("Username already taken!");
				res.redirect("back");
			} else {
				hashPass(data.pass, function(hash) {
					User.creat({
						name: data.name,
						pass: hash
					}, function(err) {
						if (err) return next(err);
						req.session.uid = user.id;
						res.redirect("/");
					});
				});
			}
		});
		next();
	}
};

login = {
	form: function(req, res, next) {
		res.render("login", {
			title: "login"
		});
	},
	submit: function(req, res, next) {
		var data = req.body.user;
		hashPass(data.pass, function(hash) {
			User.find({
				name: data.name,
				pass: hash
			}, function(err, user) {
				if (err) return next(err);
				if (user) {
					req.session.uid = user.id;
					res.redirect("/");
				} else {
					res.error("Sorry!");
					res.redirect("back");
				}
			});
		});
	},
	logout: function(req, res, next) {
		req.session.destroy(function(err) {
			if (err) throw err;
			res.redirect("/");
		});
	}
};


function hashPass(pass, fn) {
	bcrypt.genSalt(12, function(err, salt) {
		if (err) return fn(err);
		bcrypt.hash(pass, salt, function(err, hash) {
			if (err) return fn(err);
			fn(hash);
		});
	});
}

exports.register = register;
exports.login = login;