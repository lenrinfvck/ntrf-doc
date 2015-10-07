##相关学习资料
很重要，写在开头:  
[https://cnodejs.org/getstart](https://cnodejs.org/getstart)

##模块
####模块申明

    exports.fn1 = function() {};
    exports.fn2 = function() {};
    //require该模块返回一个含有fn1,fn2方法的对象  
        
    module.exports = function() {};
    //返回function本身，如返回一个构造函数
    //不能直接exports是module.exports的一个引用

##HTTP模块
监听2015端口，返回hello

```js
    var http = require("http");
    http
        .createServer(function(req, res) {
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.write("hello");
            res.end();
        })
        .listen(2015)
```

##模块使用
```js
    //page.js
    var http = require("http");

    function start() {
        http
            .createServer(function(req, res) {
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.write("hello");
                res.end();
            })
            .listen(2015);
    }
    exports.start = start;
```

```js
    //index.js
    var page = require("./page"); //可直接写page，但是必须位于node_modules里
    page.start();
```
exports.start = start;

##EVENT模块
http和net等模块都继承了events模块，可以直接使用on,emit方法，如果要在自定义对象上使用：  

```js
    var EventEmitter = require("events").EventEmitter;
    var life = new EventEmitter();
    //addEventListener
    life.on("change", function(who) {
        console.log(who + "change");
    });
    life.on("change", function(who) {
        console.log(who + "change2");
    });
    //once绑定表示只触发一次
    life.once("change", function(who) {
        console.log(who + "once")
    });
    life.emit("change", "file");
    //删除指定事件，监听某个具体参数名的事件
    life.removeListener("EVENT-NAME", arr);
    //删除所有指定事件
    life.removeAllListeners("EVENT-NAME");
```

```js
var events = require("events");
var util = require("util");
//继承evets
util.inherits(Watcher, events.EventEmitter);
```

##流程化控制
####串行流程 - [nimble]
    var flow = require("nimble");
    flow.series([fn1, fn2, fn3]);
    //异步函数fn1,fn2,fn3会依次执行  

####并行流程 - [nimble]
    flow.parallel([fn1, fn2], callback);
    //并行调用，当fn1，fn2都完成时调用callback
    //原理是在完成某个fn时就累加一次，于数组长度对比得知是否都完成


##表单处理
以模块`formidable`为例

    var form = new formidable.IncomingForm();
    form.parse(req);
    //收到文件并处理好后触发
    form.on("file", function(name, file) {
        console.log(name);
        console.log(file);
    });
    //收完输入域后触发
    form.on("field", function(field, value) {
        console.log(field);
        console.log(value);
    });
    //上传进度
    form.on("progress", function(bytesReceived, bytesExpected) {
        var percent = Math.floor(bytesReceived / bytesExpected *100);
        console.log(percent);
    });

##数据存储
####内存中
即存在变量中，在node服务器未重启前变量会保留。  

####文件中

####关系型数据库
mysql: `node-mysql`  //npm install mysql  

    var mysql = require("mysql");
    var db = mysql.createConnection({
        host: "127.0.0.1",
        user: "user",
        password: "mypassword",
        database: "mydbs"
    });

####NoSQL数据库
MongoDB: `node-mongodb-native` //npm install mongodb  

    var mongodb = requite("mongodb");
    var server = new mongodb.Server("127.0.0.1", 27017, {});
    var client = new mongodb.Db("mydatabase", server, {w: 1});

##Connect中间件
    npm install connect

    var connect = require("connect");
    var app = connect();
    app.listen(3000);

####中间件定义和使用

    function logger(req, res, next) {
        console.log("%s %s", req.method. req.url);
        next();
    }
    app
        .use(logger);
        .listen(3000);
    //当访问3000端口时，会先调用logger处理之后交个logger的next下一个中间件
    //如果无next就不会继续调用接下来的.use()中的中间件
    //或则带参数调用next(err)也不会调用之后的

####挂载（定义root目录）

    var connect = require("connect");
    connect()
        .use(logger)
        //restrict中间件中的根目录以 /admin 为准
        .use("/admin", restrict)
        .use("/admin", admin)
        .use(hello)
        .listen(3000);

####*可配置的中间件*
结合闭包，在外部函数传递参数用以返回一个动态函数作为中间件  
如实现一个可配置的路由中间件:  

    var router = require("myrouter");
    var routes = {
        GET: {
            "/users": function(req, res) {
                res.end("void1, user2");
            },
            "/user/:id": function() {}
        },
        POST: {
            "/upload": function() {}
        }
    }
    connect()
        .use(router(routes))
        .use(router(routes2))
        .listen(3000);
其中myrouter模块为

    var parse = requite("url").parse;
    module.exports = function route(obj) {
        return function(req, res, next) {
            if(!obj[req.method]) {
                next();
                return;
            }
            var routes = obj[req.method];
            var url = parse(req.url);
            var paths = Object.keys(routes);
            for (var i = 0; i < paths.length; i++) {
                var path = paths[i];
                var fn = routes[path];
                path = path
                    .replace(/\//g, "\\/")
                    .replace(/:(\w+)/g, "([^\\/]+)");
                var re = new RegExp("^" + path + "$");
                var captures = url.pathname.math(re);
                if(captures) {
                    var args = [req, res].concat(captures.slice(1));
                    fn.apply(null, args);
                    return;
                }
            }
            next();
        }
    }

 











