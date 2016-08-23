# ECMAScript 6 入门  
>原地址: [ECMAScript 6 入门 - 阮一峰](http://es6.ruanyifeng.com/#docs/destructuring)  

### 1. 新的赋值 let和const
#### let
+ let赋值的变量是块级作用域的，如在一个if或for代码块中。  
+ 不享有申明提前，后申明会报错。  
+ 重复申明var或let已申明变量会报错。  
+ 暂时性死区，如果块内有该变量的let申明，那么变量就不会从window全局取。
+ 使用let和const申明的变量不会加入window对象。    

```js
//es6中的块级作用域，直接{}包裹即可
// IIFE写法
(function () {
  var tmp = ...;
}());

// 块级作用域写法
{
  let tmp = ...;
}
```

#### const
+ 申明常量，不能修改其赋值，所以申明不赋值时会报错，和let一样的块级特性。  
+ 可以使用`export const xxx = ...`的方式来申明跨域的常量。  
+ 特殊情况`const foo = {}`时，常量值保证引用不变，但是不能保证这个对象不会改变，如`foo.prop = 123`这是能正常修改的，然而`foo = {}`是会报错的，因为这是一个新的空对象。  

### 2. 变量赋值解构
#### 基本用法
左右两侧对应，右侧无对应就`undefined`  
```js
//数组方式对应
var [a, b, c] = [1, 2, 3];
//原则上括号只要对应就行
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [ , , third] = ["foo", "bar", "baz"]; //third = "baz"
let [x, , y] = [1, 2, 3];
```
#### 默认值
解构后===undefined的变量会启用默认值  
```js
[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```


### 3. ES6原生模块化
#### 导出export
```js
var firstName = 'Ha';
var lastName = 'Gua';
export {firstName, lastName};
//别名
export {
    firstName as fn,
    lastName as ln
};
//导出默认接口
export default {firstName, lastName};
//输出其他模块，将其他模块的es6以默认输出
export { es6 as default } from './someModule';
```

#### 引入import
```js
import {firstName, lastName, year} from './profile';
//获取后用别名来使用
import { lastName as ln } from './profile';
//导入默认接口，以customName的变量名导入一个default模块
import customName from './export-default';
//同时引入默认和其他
import customName, { otherMethod } from './export-default';
//将模块整体加载，可以用obj.fn的方式调用模块暴露的参数方法
import * as circle from './circle';
circle.area(4);
circle.fn2();
```

#### 注意
1. 模块引入是动态绑定的，如果模块内部被修改会动态的反应出来。 
2. 引入的模块是只读的，不可修改该作为引入的变量的赋值关系，以上说的修改可以通过模块自身的方法产生的修改。
3. 同上，动态绑定的话，如果导出的是一个实例，那所有地方引入时都是同一个实例，类似ng的service。  

### 4. 类Class
```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    //不写逗号好难受
    //方法是定义在prototype上的
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
//表达式写法, 立即执行
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');
```

#### 继承  
```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    // 调用父类的constructor(x, y), 此句为必须，否则没有this
    super(x, y); 
    this.color = color;
  }

  toString() {
    // 调用父类方法
    return this.color + ' ' + super.toString(); 
  }
}
//继承生产的实例同时属于多个构造函数的实例，即instanceof Point和ColorPoint都为true  
```

#### super
1. 直接使用`super(arg...)`时，指父类构造函数。  
2. 最为对象使用，`super.prop`和`super.method()`可以调用父类的实例相关和静态方法。
#### 相关方法  
```js
//获取父类
Object.getPrototypeOf(ColorPoint) === Point //true
```

####　静态方法
实现类似`Foo.method1 = function() {};`的静态方法申明  
```js
class Foo {
    static method1() {
        return 'gua';
    }
}
```
#### 静态属性
与静态方法不同，静态属性还未实现，依旧用`Foo.prop = 'xxx';`的方式申明  
```js
//ES7提案，目前babel支持
class MyClass {
    static myProp = 2;
    constructor() {
        ...
    }
}
```
#### 实例属性
```js
//ES7提案，目前babel支持
class MyClass {
    //与static区别
    myProp = 2;
    constructor() {
        ...
    }
}
```
#### Mixin模式
将多个类的方法合并
```js
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
//使用
class DistributedEdit extends mix(Loggable, Serializable) {}
```
#### 注意
1. 与`function`不同，不会申明提起。
2. 自带严格模式，class内部强行严格模式。  
3. `new.target`在构造函数中调用，能得到调用new时使用的构造函数。  

### X. 代码风格参考
1. 变量:
  (1) 使用let替代var，注意没有申明提前特性。  
  (2) 全局环境的变量尽量使用const申明常量。  
2. 字符串:  
  统一使用单引号，模板字符串用反引号。  
3. 解构赋值推荐使用情况:  
```js
//使用数组成员赋值
const arr = [1, 2, 3, 4];

const [first, second] = arr;
//函数的参数如果是对象的成员
//bad
function getFullName(user) {
  const firstName = user.firstName;
}
//good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}
//best
function getFullName({ firstName, lastName }) {}

//函数返回多个值
function processInput(input) {
  return { left, right, top, bottom };
}
const { left, right } = processInput(input);
```

4. 对象:  
  (1) 结尾对象问题，单行无，多行有
```js
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};
```
  (2) 静态化对象，最好不要之后动态添加属性。  
```js
//update，不得已更新时  
const a = {};
Object.assign(a, { x: 3 });
//good，一开始初始化时静态化  
const a = { x: null };
a.x = 3;
```
  (3) 属性表达式，动态的属性名。  
```js
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```
  (4) 赋值简介写法
```js
let ref = 'gua';
const atom = {
  ref,      //同名变量时省略
  value: 1,
  addValue(value) {  //函数简写
    return atom.value + value;
  },
};
```

5. 数组  
  (1) 扩展运算符  
```js
//直接浅拷贝，items是一个Array
const itemsCopy = [...items];
```
  (2) 类数组转换Array.from  
```js
//如dom的NodeLists
const nodes = Array.from(foo);
//es5
var nodes = [].slice().apply(foo);
```

6. 函数  
  (1) 立即执行匿名函数  
```js
(() => {
  console.log('Welcome to the Internet.');
})();
```
  (2) 简单的、单行的、不会复用的函数，建议采用箭头函数  
```js
[1, 2, 3].map((x) => {
  return x * x;
});
// best
[1, 2, 3].map(x => x * x);
//箭头自带指明上下文，不再使用_this等方式保存this
const boundMethod = (...params) => method.apply(this, params);
```
  (3) 默认值语法  
```js
function handleThings(opts = {}) {}
```

7. Map结构  
  用于实现key:value的数据结构，由于有`.keys()` `.values()`等遍历方法，只是操作数据的话比Object更方便。当然这些遍历方法可以皆有sunderscore和lodash来实现。  

8. Class
  活用class和extends

9. 模块化
  原生模块化使用，import和export
