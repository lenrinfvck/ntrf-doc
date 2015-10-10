var db = require("mongoose");
var bcrypt = require("bcrypt");
db.connect("mongodb://localhost/say_data");

var schema = new db.Schema({
	name: String,
	password: String
});

var User = db.model("User", schema);

User.prototype = {
	save: function(fn) {
		if (this.id)
	},
}