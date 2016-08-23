var EventEmitter = require("events").EventEmitter;
var life = new EventEmitter();
//addEventListener
life.on("change", function(who) {
	console.log(who + "change");
});
life.on("change", function(who) {
	console.log(who + "change2");
});
life.emit("change", "file");