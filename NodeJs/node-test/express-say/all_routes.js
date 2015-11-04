var express = require("express");
var router = express.Router();

var index = require("./controllers/c_index");
var user = require("./controllers/c_user");
var entries = require("./controllers/c_entries");
var register = user.register;
var login = user.login;

router.get("/", index);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/login", login.form);
router.post("/login", login.submit);
router.get("/logout", login.logout);

router.get("/post", entries.form);
router.post("/post", entries.submit);

module.exports = router;