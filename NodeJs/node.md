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


