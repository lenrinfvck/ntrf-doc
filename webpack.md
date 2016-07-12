# webpack简要使用
>[Webpack 中文指南](http://zhaoda.net/webpack-handbook/index.html)  
>[Webpack 入门](http://www.cnblogs.com/vajoy/p/4650467.html)  
>[Webpack 使用经验](http://www.cnblogs.com/giveiris/p/5237080.html)  

### 1.安装命令行
`$ npm install webpack -g` 全局命令行
`$ npm install webpack --save-dev` 工程内用

参考用package.json
```json
{
  "name": "webpack-example",
  "version": "1.0.0",
  "description": "A simple webpack example.",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "webpack"
  ],
  "author": "ntrf",
  "license": "MIT",
  "devDependencies": {
    "css-loader": "^0.21.0",
    "style-loader": "^0.13.0",
    "webpack": "^1.12.2"
  }
}
```

### 2.webpack配置
参考webpack.config.js
```js
var webpack = require('webpack')
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  //入口函数
  entry: './entry.js',
  //输出
  output: {
    path: __dirname,
    filename: 'main.js'
  },
  module: {
    //配置对应文件的加载处理器
    loaders: [
      { test: /\.css$/, loader: 'style!css'},
      //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  //插件引入
  plugins: [
    //给输出文件加上头部注释
    new webpack.BannerPlugin('This file is created by ntrf' + (new Date()).getTime()),
    //提取多个入口文件的公共脚本生成一个common.js
    commonsPlugin
  ]
}
```

### 3.运行
`$ webpack` 直接根据config运行  
`$ webpack --progress --colors --watch` --带进度条 --带彩色 --监听模式  
使用webpack-dev-server来创建带自动刷新的静态服务器  
```bash
npm install webpack-dev-server -g
webpack-dev-server  --progress --colors
```

#### 其他参数
+ `--display-error-details` 输出详细错误信息
+ `--config xxx.js` 指定配置文件
+ `-p` 压缩混淆脚本
+ `-d` 生成map映射文件 

### 4.配置详细
#### entry
```json
entry: {
    page1: "./page1",
    //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
    page2: ["./entry1", "./entry2"]
}
output: {
    path: "dist/js/page",
    //[name]即entry中的page1
    filename: "[name].bundle.js"
}
```

#### module
```json
 module: {
    //加载器配置
    loaders: [
        //.css 文件使用 style-loader 和 css-loader 来处理
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        //.js 文件使用 jsx-loader 来编译处理
        { test: /\.js$/, loader: 'jsx-loader?harmony' },
        //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
        { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
        //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
}
```
`-loader`可以省略，多个loader用`!`连接  
一般loader的的模块名都是相同的如`npm install url-loader -save-dev`或直接写入package.json  

#### resolve
```json
resolve: {
    //查找module的话从这里开始查找
    root: 'E:/github/flux-example/src', //绝对路径
    //模块目录，是相对路径
    modulesDirectories: ['xxmodule'],
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.json', '.scss'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
        AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
        ActionType : 'js/actions/ActionType.js',
        AppAction : 'js/actions/AppAction.js'
    }
}
```

#### externals 帮助处理CDN引入的的外部文件
```json
//需要该文件提前在<scirpt>中引入
{
    externals: {
        // require("jquery") 是引用自外部模块的
        // 对应全局变量 jQuery
        "jquery": "jQuery"
    }
}
```

#### shimming操作
```js
loaders: [
    { test: require.resolve("./src/js/tool/swipe.js"), loader: "exports?swipe"}
]
//使用
require('./tool/swipe.js');
swipe();
```

#### Plugin - CommonsChunkPlugin
```js
entry: {
        p1: "./page1",
        p2: "./page2",
        p3: "./page3",
        ap1: "./admin/page1",
        ap2: "./admin/page2"
},
output: {
    filename: "[name].js"
},
plugins: [
    //自定义选在需要提取common的部分
    new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"]),
    new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
]
```

#### Plugin - extract-text-webpack-plugin
生成独立的css文件，并使用link引入  
```js
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    plugins: [commonsPlugin, new ExtractTextPlugin("[name].css")],
    ...
```


### 5.自用尝试
less + vue  
```json
var webpack = require('webpack')
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  //入口函数
  entry: './entry.js',
  //输出
  output: {
    path: __dirname,
    filename: 'main.js'
  },
  module: {
    //配置对应文件的加载处理器
    loaders: [
      { test: /\.css$/, loader: 'style!css'},
      { test: /\.less$/, loader: 'style!css!less'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      //将.vue的组件化文件转为webpack模块
      { test: /\.vue$/, loader: 'vue'}
    ]
  },
  //插件引入
  plugins: [
    //给输出文件加上头部注释
    new webpack.BannerPlugin('This file is created by ntrf' + (new Date()).getTime()),
    //提取多个入口文件的公共脚本生成一个common.js
    commonsPlugin
  ]
}
```







