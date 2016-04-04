# underscore常用
>[中文手册参考](http://www.css88.com/doc/underscore/)  

### 数组操作
> ES5中Array引入every()、filter()、forEach()、map()、some() ，reduce()等，ie8不支持

##### _.map(arr, fn(element, index, list), [context])
同`Array.map(ie9+)` ，返回经由fn加工后的新数组，如果遍历一个对象则回调为`fn(value, key, list)` ，context为call上下文，如果有原生forEach则使用

##### _.each(arr, fn(element, index, list), [context])
无返回值，类似`Array.forEach(ie9+)`  

##### _.reduce
