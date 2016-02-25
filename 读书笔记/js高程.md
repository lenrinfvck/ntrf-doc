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








