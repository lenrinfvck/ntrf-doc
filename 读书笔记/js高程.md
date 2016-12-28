# js高程复习笔记

### 一.JS相关简介  
#### 组成
JavaScript由三部分组成：  
+ 核心(ECMAScript)  主E5, 前沿E6  
+ 文档对象模型(DOM)  主DOM2, ie9+支持DOM3
+ 浏览器对象模型(BOM)  

##### DOM2
+ Views  //视图接口
+ Events  //事件和事件处理
+ Style  //元素样式接口
+ Traversal and Range  //遍历和DOM操作

##### BOM
+ 弹出关闭窗口等控制
+ 提供浏览器详细信息`navigator`对象  
+ 浏览器所加载页面的详细信息`location`对象  
+ 显示器相关`screen`对象  
+ 对cookies的支持  
+ 如XMLHttpRequest和ActiveXObject等自定义对象

### 二.JS基础
#### 1.数据类型
`基本类型`: Undefined, Null, Boolean, Number, String  
`复杂类型`: Object
##### 1.1 typeof返回值
undefined(undefined), boolean, string, number(NaN), object(对象或null), function 

##### 1.2 Number
+ 最高精确到17位小数，非1/2，1/4，1/8等小数时为非精确值。  
+ NaN用isNaN来检测，NaN == NaN (false)  
+ 数值转换Number(所有), parseInt(以数字开头的string), parseFloat(string)

##### 1.3 Object
var o = {}; // var o = new Object();  

实例属性方法 | 含义
--- | ---
constructor | 保存创建当前对象的构造函数(如Object())
o.hasOwnProperty(name) | 检测name属性在实例中是否独立存在，除去原型链
o.isPrototypeOf(object) | o是否包含object的原型
o.propertyIsEnumerable(name) | 判断该属性能否用for-in枚举
o.toLocaleString() | 返回对象字符串表示，与执行环境地区对应
o.toString() | 同上，泛用
o.valueOf() | 返回对象的字符串、数值或布尔

#### 2.函数
##### arguments对象
在函数中可以使用arguments[0]等方式来调用传入的参数。  
arguments.length返回传入参数的数量。  
fn.length表示期望传入的参数。  

##### 重载
强类型语言的重载会根据参数类型不同选用不同的定义的函数。  
js的函数重复定义后，会覆盖之前的定义。  

#### 3.作用域
+ for(var i;i<10;i++){} 由于for不是块级作用域，所以for等{}语句不具有局部作用域

### 三.引用类型
#### 1.instanceof
`obj instanceof Array` 判断obj的构造函数是否是Array，常用与判断数组。  
E5(ie9+)开始尅一使用`Array.isArray(obj)`来判断。

#### 2.原生构造函数
##### 2.1 Object
同上 *二 1.3*  

##### 2.2 Array
**迭代方法**:  
+ every(fn(item, index, array)): 对每一项运行函数，所有返回true则返回true。  
+ some(): 同上，有一个true就返回true。  
+ filter(): 返回执行结果为true的项组成的新数组。  
+ forEach(): 无返回值，对每一项执行函数。  
+ map(): 对每一项执行函数，其结果组成新数组返回。  
**归并方法**:  
+ reduce(fn(prev, cur, index, array)):  从第二项开始迭代，此时prev为第一项，执行函数的结果作为下一次执行的prev参数，最后返回prev。  

##### 2.3 Date
`new Date("May 25, 2004")` 相当于调用了`new Date(Date.parse(...))`  
或则会使用Date.UTC()解析    
**有效格式:**  
+ "月/日/年"，如 `6/13/2004`  
+ "英文月 日,年"，如 `January 12,2004`  
+ "英文星期 英文月 日 年 时:分:秒 时区"， 如 `Tue May 25 2004 00:00:00 GMT-0700`  
+ ISO 8601扩展格式 YYYY-MM-DDTHH:mm:ss:sssZ，如 `2004-05-25T00:00:00`  
+ Date.UTC()方式，new Date(Y, M-1, D, h, m, s)，如`2005, 4, 5, 17, 55, 55`  
+ 或则以毫秒为单位的整数形式  

**部分方法**
+ Date.now(): 返回现在本机时间的Date对象(直接使用new Date()也能返回当前时间)  
+ getTime(): 获得整数毫秒，值同valueOf()  
+ getFullYear(): 4位数的年份取得  
+ getMonth, getDate日, getDay星期, getHours, getMinutes, getSeconds

##### 2.4 RegExp
使用`var reg = /[\s\S]+/g;`来创建正则对象，或则`new RegExp("[\s\S]+", "g")`  
**实例属性方法**
+ global/ignoreCase/multiline: 对应gim三个设置的布尔值  
+ lastIndex: 整数，表示开始搜索的下一个匹配项的字符位置，从0算  
+ source: 正则表达式的字符串  
+ .exec(str): 返回str中匹配项的数组或则null，额外属性input表示str  
+ .test(str): 匹配则返回true  

##### 2.5 Function
`function sum(){}`声明的对象, 即函数。  
函数赋值: 声明时`var fn = function(){};`, 或则`var fn2 = fn; function fn(){}`  
**属性和方法**  
+ arguments和this，arguments如 *二 2*。
    [this]  
    方法调用:等于调用该方法的对象实例；  
    函数调用:等于全局对象，window，通用函数相当于都为window的方法，原理同上；  
    构造器调用:new时，this为建立的新对象实例；  
    apply调用:所有function对象都用的方法.apply(this,array) //第一参数为this值，第二参数为传入的参数数组。  
+ call(ctx, arg1, arg2)/apply(ctx, [arg1, arg2]) 以ctx为上下文执行函数，即设置函数中this的值  

##### 2.6 基本包装类型String, Number, Boolean
赋值这3个基本类型的变量时，会自动创建相应的包装类型对象，从而使这些变量能够使用相应的实例方法。  

##### 2.7 Global(浏览器环境即window)
+ encodeURI()/encodeURIComponent(): url编码/解码  
+ eval(string): 执行string这段代码  
+ 其他各构造函数都挂载到Global的属性  

##### 2.8 Math
+ .min(num1, num2, num3)/.max(): 返回最小最大值  
+ .ceil()/.floor()/.round(): 向上/向下/四舍五入  
+ .random(): 返回0~1的随机数  

#### 四.面向对象
##### 1. defineProperty 修改数据属性  
```js
var person = {};
Object.defineProperty(person, "name", {
    configurable: true, //能否delete掉，或者修改以下属性
    enumerable: true, //能否通过for-in循环返回
    writable: true, //能否改写属性数据值
    value: "Len" //数据值
});
```

```js
//访问器属性
var book = {
    _year: 2004,
    edition: 1
}
Object.defineProperty(book, "year", {
    get: function() {
        return this._year;
    },
    set: function(newValue) {
        if(newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    } 
});
```

##### 2. defineProperties 设置多个属性
```js
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    p2: {
        get: fn(),
        set: fn()
    }
});
```

```js
//原型链属性
function Person() {}
Person.prototype.name = "Nicholas";

var person1 = new Person();
var person2 = new Person();

person1.name = "len";
console.log(person1.name, person2.name, person1.__proto__.name);
```

```js
function Person(){
}
Person.prototype = {
    name : "Nicholas",
    sayName : function () {
        console.log(this.name);
    }
};
var friend = new Person();
Person.prototype.sayName = function() {
    console.log(1);
}
friend.sayName();
```
匿名函数创建块级作用域  
```js
function outputNumbers(count){
    (function () {
        for (var i=0; i < count; i++){
            console.log(i);
        }
    })();
    console.log(i); //undefined
}
```

#### 五. BOM
+ window（核心）  
+ location  
+ navigator  
+ screen  
+ history  

##### 1. Window  
###### 1.1 注意事项
虽然是全局Global但是，但是delete很迷:
```js
var age = 29;
window.color = "red";
delete window.age; //报错或则返回false
delete window.color; //ie9+返回true
console.log(window.age); //29
console.log(window.color); //undefined
```
frame的情况:  
通过`window.frames['frame1']`来获取其他frame中的window对象  
或则使用`top.frames[0]`来获取  

##### 1.2 相关属性方法 
**窗口位置** - 表示浏览器窗口在屏幕中的位置：  
```js
//一般为screenLeft/Top, 以下是兼容写法
var leftPos = (typeof window.screenLeft == "number") ?
                  window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ?
                  window.screenTop : window.screenY;
```
修改这个数值，即移动窗体使用`.moveTo(x, y)`，`.moveBy(offX, offY)`，一般被禁用  

**窗口大小** - outerWidth表示浏览器软件的大小，innerWidth表示视窗大小
```js
//标准
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
if (typeof pageWidth != "number"){
    if (document.compatMode == "CSS1Compat"){
        //ie8 兼容推荐
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        //ie6
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}
```
修改这个数值，即改变视窗使用`.resizeTo(x, y)`，`.resizeBy(offX, offY)`，一般被禁用

**其他**
+ `.open(url, target, properties)`: 第二个参数也可以是其实框架frame的id, 第三参数可以是形如`'height=400,width=400,top=10,resizable=yes'`的属性设置;返回值是一个新窗口的window对象的引用  
+ `.close()`: 关闭窗口  
+ `alert(), confirm(), prompt()`: 
```js
if (confirm("Are you sure?")) {
    //点击确定
    alert("I'm so glad you're sure! ");
} else {
    //点击取消
    alert("I'm sorry to hear you're not sure. ");
}
//prompt返回值为点击确定后所填入的值, 取消则返回null
var result = prompt("What is your name? ", "默认值");
```

#### 2. location
##### 2.1 概要
`window.location`和`document.location`皆可，同时属于BOM和DOM  
**相关属性：**  

属性 | 例子 | 说明
--- | --- | ---
hash | #index | URL地址中#后的字符串
host | www.baidu.com:80 | 服务器名称和端口号(如果有)  
hostname | www.baidu.com | 同上，不带端口  
href | http://www.baidu.com | 完整的URL地址
pathname | /list/search.html | 域名之后的目录部分或文件名
port | 80 | 端口
protocol | http: | 协议
search | ?q=js | patchname结束后的?开始的部分  

##### 2.2 相关方法 
**位置操作**  
.assign(), 修改location的除hash外的数据都会调用此方法  
```js
//以下方式等效
location.assign("http://www.wrox.com");
window.location = "http://www.wrox.com";
location.href = "http://www.wrox.com";
```
.replace(), 此方法修改URL不会写入历史记录，无法返回上一个页面  
`location.replace('http://www.wrox.com')`  
.reload(), 刷新，传递参数true则强制刷新  

#### 3. navigator
部分属性: 
+ appName: 浏览器完整名称  
+ cookieEnabled: 是否启用cookie  
+ language: 浏览器主语言  
+ plugins: 包含的插件数组  
+ platform: 系统平台  
+ systemLanguage: 操作系统语言  
+ userAgent: 浏览器用户代理字符串  

#### 4. screen
部分属性:  
+ width/height: 屏幕宽度和高度  

#### 5. history
**.go()**  
```js
history.go(-1); //-1后退一页，1前进一页, 2前进两页
history.go("wrox.com"); //跳到最近的该域名的页面
```
.back(), .forward() 也可以代表后退，前进  
**.length** 表示历史记录的长度  
[html5]  
修改state的历史修改是不会刷新页面的。  
+ .pushState(data, title [,url]): 
  往历史记录堆栈顶部添加一条记录，onpopstate时间触发时data会作为参数传递，title为页面标题，暂时不支持，URL不传递则是当前页  
+ .replaceState(data, title [,url]): 
  更改当前历史记录  
+ .state: 存储以上方法时的data值  
+ window.onpopstate: 响应pushState或replaceState的调用

### 六. DOM
#### 1. 节点操作
##### 节点关系属性
+ `childNodes`: NodeList类数组对象,包含其子节点    
  可以使用`[].slice.call(someNode.childNodes, 0)`来转化为数组  
+ `firstChild/lastChild`: 第一/最后一个子节点  
+ `parentNode`: 父节点  
+ `nextSibling/previousSibiling`: 下一个/上一个兄弟节点  

##### 节点操作
+ `appendChild(nodeObj)`: 插入该nodeObj到该节点的childNodes的结尾  
+ `insertBefore(nodeObj, someNode)`: 同上，插入到开头，第二参数填写后会插入到该节点之前  
+ `replaceChild(new, old)`: 用new节点替换old节点  
+ `removeChild(node)`: 移除节点  
+ `cloneNode(true)`: 返回一个节点的副本，传递true则深复制，包括子孙节点，false只节点本身，只复制特性，DOM绑定事件等无关 
+ `normalize()`: 合并两个紧临的文本节点，删除空文本节点  

#### 2. Document
##### 2.1 document.documentElement及其他常用属性
documentElement指向html元素节点，一般`document.childNodes[0]`也能访问html元素节点，一般使用documentElement  
其他常用节点和属性:  
+ `document.body`: 获取body元素  
+ `document.doctype`: 获取<!DOCTYPE>  
+ `document.title`: 页面标题  
+ `document.cookie`: 设置或返回相关所有cookie  

##### 2.2 元素查找  
+ `.getElementById(id)`: 以元素id获取节点，此方法只能由**document**调用，其他节点不行  
+ `.getElementsByTagName(tag)`: 按标签名返回nodeList  
+ `.getElementsByName(name)`: 按标签中的name属性返回nodeList
+ `.getElementsByClassName(class)`: 同上，使用class  
+ `.querySelector(css)`: 使用css选择器，返回第一个匹配节点  
+ `.querySelectorAll(css)`: 同上，返回nodeList  
  
特殊的nodeList集合:  
+ `document.anchors`: 包含所有带name的`<a>`元素  
+ `document.forms`: 包含文档中所有`<form>`元素  
+ `document.images`: 包含所有`<img>`元素  
+ `document.links`: 包含所有带href的`<a>`元素

#### 3. Element
`.nodeName/.tagName`: 都是返回标签名，会有大小写  
`标签属性如id, title, className`: 返回相应值  
##### 相关方法
`.getAttribute(), setAttribute(), removeAttribute()`: 操作标签属性  
`.matchesSelector(class)`: 判断该element是否符合该class选择器  

##### attributes 
使用时如`ele.attributes.id`,`ele.attributes.getNamedItem`  
`getNamedItem(attr)`: 更具名称获得属性, 同样具有相应remove、set方法
`item(pos)`: 返回相应序数的属性节点  

##### 创建element
`document.createElement(tagName)`: 创建元素节点  
```js
var div = document.creatElement("div");
div.id = "myNewDiv";
dic.className = "box";
document.body.appendChild(div);
```

`document.createTextNode("Hello world!")`: 创建文本节点，也使用appendChild等添加，添加多个的时候使用element.normalize()就能变成一个  

#### 4. DOM操作
##### 4.1 动态脚本
```js
//动态js插入
function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}
//内链的js脚本
function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex){
        script.text = code;
    }
    document.body.appendChild(script);
}
//动态css
function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}
//动态style
function loadStyleString(css){
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    } catch (ex){
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}
```

#### 5. HTML5新增
`classList`: 以前使用`className.split(/\s+/);`方式构建数组，使用classList即可获得一个class的集合，并且有add,remove,contains(类似hasClass),toggle等方法操作class集合。  

`document.activeElement`: 指向当前获得焦点的元素,`document.hasFocus()`判断页面是否获得焦点  

`el.scrollIntoView(true)`: 让窗口滚动到此元素，传递true表示窗口顶部对齐元素顶部  

`parentEl.contains(el)`: 检测el是否属于后代节点  

### 七. 事件
#### 1. 绑定事件
DOM0: .onclick = cb的方式;  
DOM2: .addEventListener("click", cb, false) ,ie9+;  
IE: attachEvent("onclick", cb), detachEvent("onclick", cb);  

#### 2. 事件对象Event
属性方法 | 说明
--- | ---
bubbles | 事件是否冒泡  
cancelable | 事件是否可以取消默认行为  
currentTarget(回调中的this) | 其事件处理程序当前正在处理事件的那个元素，即绑定该回调的元素对象  
defaultPrevented | 为true表示已经调用了preventDefault()  
detail | 事件相关细节信息  
eventPhase | 1表示捕获阶段，2表示处于目标，3表示事件冒泡  
.preventDefault() | 取消默认行为
.stopPropagation() | 取消事件进一步冒泡和捕获
.stopImmediatePropagation() | 取消事件冒泡等，并阻止事件处理函数的调用  
target | 事件的目标  
trusted | 为true表示事件是浏览器的，为false则为自定义事件  
type | 事件名、类型
view | 与事件关联的抽象视图，等同于发生事件的window对象  

##### W3C和IE的event
一般在处理函数的第一个回调参数即event, `function(event){}`；  
而老版本DOM0中是`var event = window.event`的方式使用。  

IE中的属性方法 | 说明
--- | ---
cancelBubble | 默认false，为true时等效stopPropagation()  
returnValue | 默认为true，为false时等效prevnetDefault()  
srcElement | 等效target  
type | 事件类型  

##### 事件模拟
```js
//创建事件对象
var event = document.createEvent("MouseEvents"); //DOM3中是MouseEvent
//初始化模拟事件内容
event.initMouseEvent("click", true, true, document.defaultView);
//执行事件
btn.dispatchEvent(event);
```

### 八. 表单
#### 富文本编辑
开启设置后，文本编辑区域是能受css控制的  
```js
<iframe name="richedit" style="height:100px;width:100px;" src="blank.htm"></iframe>
frames["richedit"].document.designMode = "on";
```
不使用iframe的方式  
```html
<div class="editable" id="richedit" contenteditable></div>
```

### 九. 高级技巧
#### 作用域安全的构造函数 & new操作符原理  
```js
function Person(name, age, job){
    if (this instanceof Person){
        this.name = name;
        this.age = age;
        this.job = job;
    } else {
        return new Person(name, age, job);
    }
}
var person1 = Person("Nicholas", 29, "Software Engineer");
alert(window.name);      //""
alert(person1.name);     //"Nicholas"
```
+ new首先创建了一个空对象，并使其__proto__引用指向构造函数的prototype，其中包含属性constructor存储了构造函数的引用，能被instanceof识别；  
+ 之后执行该函数，并用.apply指向该空对象并传递相应参数；  
+ 最后返回该对象即为实例对象  





















