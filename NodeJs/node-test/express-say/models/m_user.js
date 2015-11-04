var db = require("../my_modules/mongoose");

var schema = new db.Schema({
	name: String,
	password: String
});

var User = db.model("User", schema);

module.exports = User;