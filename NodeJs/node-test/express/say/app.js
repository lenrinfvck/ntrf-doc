var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var multer = require("multer");
var swig = require("swig");
var http = require("http");

var routes = require("./all_routes");

var app = express();

// view engine setup
app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
if ("development" == app.get("env")) {
	app.set("view cache", false);
	swig.setDefaults({
		cache: false
	});
}

app.set("static", path.join(__dirname, "public"));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(multer({
	dest: app.get("photos")
}));

app.use(cookieParser());
//public下静态文件服务器
app.use(express.static(path.join(__dirname, "public")));

//路由注册
app.use("/", routes);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// 	var err = new Error("Not Found");
// 	err.status = 404;
// 	next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "dev") {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: {}
	});
});

http.createServer(app).listen(app.get("port"), function() {
	console.log("Express server listening on port");
});
//module.exports = app;