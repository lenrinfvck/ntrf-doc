var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/say_data");

module.exports = mongoose;