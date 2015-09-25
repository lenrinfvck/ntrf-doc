var page = require("page");
var router = require("router");
var requestHandle = require("requestHandle");

var handle = {};
handle["/"] = requestHandle.start;
handle["/start"] = requestHandle.start;
handle["/upload"] = requestHandle.upload;

page.start(router.route, handle);