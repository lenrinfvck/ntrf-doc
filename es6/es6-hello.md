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












