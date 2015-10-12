var express = require("express");
var router = express.Router();

var index = require("./controllers/c_index");
var user = require("./controllers/c_user");
var register = user.register;
var login = user.login;

router.get("/", index);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/login", login.form);
router.post("/login", login.submit);
router.get("/logout", login.logout);

module.exports = router;