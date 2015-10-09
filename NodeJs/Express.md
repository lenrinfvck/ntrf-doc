#Express
Express构建在Connect之上的web框架  
全局安装`$ npm install -g express`  
控制台工具`$ npm install -g express-generator`  

##1. 最小案例
    var express = requite("express");
    var app = express();
    app.get("/", function(req, res) {
        res.send("hello");
    });
    app.listen(3000);

##2. 环境配置
###*app.configure()*
4.0+中已废除, 改用`if ("development" == app.get("env")`
####设置环境变量：

>要在UNIX中设置环境变量,可以用这个命令:  
>$ NODE_ENV=production node app  
>在Windows中用这个:  
>$ set NODE_ENV=production  
>$ node app  
>这些环境变量会出现在你程序里的process.env对象中。[process.env.NODE_ENV]

如此设置后，可以利用app.configure()来判断process.env以调用相应处理

    //所有环境适用
    app.configure(function() {
        app.set("views", __dirname + "/views");
    });
    //仅dev环境时
    app.configure("dev", function() {
        app.use(express.errorHandler());
    });

###*app.set()*和*app.get()*
设定express内的环境变量，相应的get是获取  
其中get还有只用方式是get(path, fn)为旧版中的路由绑定方式。  

    var path = require('path');
    //设置目录变量
    app.set("photos", __dirname + "/public/photos");
    app.set("views", path.join(__dirname, "views"));
    //__dirname 为全局变量，值为当前目录

####模板引擎
    //设置默认为jade
    app.set("view engine", "jade");

    //设置默认为swig
    app.engine("html", "swig.renderFile");
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    //默认会开启缓存，需手动关闭
    app.set('view cache', false);
    swig.setDefaults({ cache: false });
    app.get('/', function (req, res) {
        res.render('index', { json });
    });

##3. express4中的路由写法
*app.js*
```js
    //具体路由配置文件
    //若为文件夹会使用index.js
    var routes = require("./routes");      
    var upload = require("./routes/upload");

    //模板引擎配置
    app.engine("html", swig.renderFile);
    app.set("view engine", "html");

    //模板查找根目录
    app.set("views", path.join(__dirname, "views"));
    if ("development" == app.get("env")) {
        app.set("view cache", false);
        swig.setDefaults({
            cache: false
        });
    }

    //转由路由模块中间件处理
    app.use("/", routes);
    app.use("/upload", upload);
```
  
*index.js(routes)*
```js
    var express = require('express');
    var router = express.Router();
    var Photo = require("../models/photo");

    router.get('/', function(req, res, next) {
        //req参数中能使用外层的app对象
        console.log(req.app.get("views"));
        Photo.find({}, function(err, photos) {
            if(err) return next(err);
            //渲染视图
            res.render("index", {
                title: "Photos",
                photos: photos
            });
        });
    });

    module.exports = router;
```
