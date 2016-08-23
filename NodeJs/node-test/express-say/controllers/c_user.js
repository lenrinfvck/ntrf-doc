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
					User.create({
						name: data.name,
						password: hash
					}, function(err) {
						if (err) return next(err);
						req.session.uid = user.name;
						req.session.user = user;
						res.redirect("/login");
					});
				});
			}
		});
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
		User.find({
			name: data.name,
		}, function(err, user) {
			if (err) return next(err);
			if (user.length <= 0) return next(err);
			hashCheck(data.pass, user[0].password, function(ok) {
				if (ok) {
					req.session.uid = user[0].name;
					req.session.user = user[0];
					res.redirect("/");
				} else {
					res.redirect("/login");
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
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return fn(err);
		bcrypt.hash(pass, salt, function(err, hash) {
			if (err) return fn(err);
			fn(hash);
		});
	});
}

function hashCheck(input, hash, fn) {
	bcrypt.compare(input, hash, function(err, res) {
		if (err) return fn(err);
		fn(res);
	});
}

exports.register = register;
exports.login = login;