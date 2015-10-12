var db = require("mongoose");
db.connect("mongodb://localhost/say_data");

var schema = new db.Schema({
	name: String,
	password: String
});

var User = db.model("User", schema);

module.exports = User;