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



