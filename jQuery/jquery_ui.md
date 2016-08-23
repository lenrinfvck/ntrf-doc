# jQuery-ui 笔记

### 1.引入
在官网下载定制包后，引入以下文件  
```html
<link rel="stylesheet" href="css/themename/jquery-ui.custom.css" />
<script src="js/jquery.min.js"></script>
<script src="js/jquery-ui.custom.min.js"></script>
```

### 2.使用
#### 2.1 widget部件库
##### 案例  
```js
//调用进度条，传递配置参数
$( "#elem" ).progressbar({ value: 20 });
//get
$( "#elem" ).progressbar( "value" );
//set
$( "#elem" ).progressbar( "value", 40 );
//大部分部件返回jQuery对象，可链式
```
##### 公用方法案例
```js
//传递option时可以重置初始化属性
$( "#elem" ).progressbar( "option", {
    value: 100,
    disabled: true
});
```
公用 | 作用
--- | ---
option | 重新配置属性
disable/enable | 禁用部件/启用
destroy | 删除部件(.remove元素时也会自动销毁)
widget | 返回建立部件时创建的新对象，没有则返回原jq对象

##### 事件
一般情况  
```js
//一般都有一个以部件名加change的事件
$( "#elem" ).bind( "progressbarchange", function() {
    alert( "The value has changed!" );
});
//使用组件的绑定
$( "#elem" ).progressbar({
    change: function() {
        alert( "The value has changed!" );
    }
});
```

公共事件`create`  

### 3.自定义组件
创建
```js
//创建一个mywidget，调动可以通过$.mywidget()调用
$.widget( "custom.mywidget", {} );
//继承其他widget
$.widget( "custom.mywidget", $.ui.dialog, {} );
```
为组件添加方法  
```js
$.widget( "custom.mywidget", $.ui.dialog, {
    red: function() {
        this.element.css( "color", "red" );
    }
    //和继承的组件方法重名就重载覆盖
});
//调用
$dom
    .mywidget()  //默认返回一个jq-ui的实例对象
    .mywidget("red");
//不覆盖重载
{
    open: function() {
        console.log("open");
        //_super()和_superApply调用原方法，区别类似call,apply
        return this._super();
    }
}
```
实例对象
```js
var dialog = $dom.data("ui-dialog");
//1.11后
var dialog = $dom.dialog("instance").close();
```
默认属性
```js
$.widget( "ns.plugin", {
    // Default options.
    options: {
        param1: "foo",
        param2: "bar",
        param3: "baz"
    },
    _setOption: function(key, value) {
        //_setOption和_setOptions(options)是默认的设置属性的私有方法
        this._super(key, value);
    }
    _create: function() {
        // 业务逻辑初始化时 this.element为作用的jq-dom对象
        // 其他属性如this.options.param1等方式使用
    },
    //公共方法
    fn: function(value) {
        console.log(value);
    },
    //私有方法
    _fn: function() {}
});
```
添加事件回调
```js
this._trigger("change", jq事件对象, 参数);
//触发后以下方式调用回调
$( "#elem" ).bind( "progressbarchange", function(e, data) {
    alert( "The value has changed!" );
});
//使用组件的绑定
$( "#elem" ).progressbar({
    change: function(e, data) {
        alert( "The value has changed!" );
    }
});
```






