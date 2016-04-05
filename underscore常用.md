# underscore常用
>[中文手册参考](http://www.css88.com/doc/underscore/)  

### 数组操作
> ES5中Array引入every()、filter()、forEach()、map()、some() ，reduce()等，ie8不支持

##### _.map(arr, fn(element, index, list), [context])
同`Array.map(ie9+)` ，返回经由fn加工后的新数组，如果遍历一个对象则回调为`fn(value, key, list)` ，context为call上下文，如果有原生forEach则使用

##### _.each(arr, fn(element, index, list), [context])
无返回值，类似`Array.forEach(ie9+)`  

##### _.shuffle(arr)
返回一个乱序的新数组  

##### _.find(list, fn(num), [context])
逐个数据执行fn，返回第一个值为true的项  
```js
var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> 2
```

##### _.filter(list, fn(num), [context]) 
同原生`Array.filter(ie9+)`，逐个执行fn，为true的项加入到新数组一并返回  
`.reject()`是相反的false的情况  

##### _.where(list, obj)
一种高级查询，返回list对象数组中包含了obj所有信息的项组成的新数组  
```js
_.where(list, {author: "Shakespeare", year: 1611});
=> [{title: "Cymbeline", author: "Shakespeare", year: 1611},
    {title: "The Tempest", author: "Shakespeare", year: 1611}]
```

##### _.findWhere(list, obj)
`_.where()`的单结果版，只返回第一个匹配  

##### _.contains(list, value, [fromIndex])
list中包含value时返回true, *fromIndex*是开始检索位置  

##### _.invoke(list, method, arg)
*method*可以是一个函数或则方法名的字符串，遍历list依次执行该方法，如果method是一个函数则直接执行，第一个参数是当前遍历的数组项，如果不是则尝试当做该数组项的一个方法去调用
```js
_.invoke = restArgs(function(obj, method, args) {
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
        var func = isFunc ? method : value[method];
        return func == null ? func : func.apply(value, args);
    });
});
```

##### _.pluck(list, propertyName)  
返回对象数组中某一属性组成的新数组
```js
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.pluck(stooges, 'name');
=> ["moe", "larry", "curly"]
```

##### _.max, _.min _.sortBy(list, [propertyName])
按propertyName属性的值排序，max和min可以分别得到相应值

##### _.sample(list, [n])
从list中随机选n个项返回  

##### _.without(array, *values)
返回除去values的数组  

##### _.zip 和 _.unzip(*arrays)
```js
_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
=> [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]
```

##### _.range([start], stop, [step]) 
生成序列数组
```js
_.range(1, 11);
=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
_.range(0, 30, 5);
=> [0, 5, 10, 15, 20, 25]
_.range(0, -10, -1);
=> [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
```

### 对象操作
##### _.keys(obj)
返回由该obj的key值组成的数组，不包括`__proto__`，`allKeys()`则包括原型链  

##### _.valuse(obj)
同keys，返回value组成的数组  

##### _.mapObject(obj, fn(val, key), [context])
对象版的map，遍历每个属性对其值执行fn处理

##### _.extend(oldObj, addObj)
同jquery的extend，第一个属性无深浅复制选择

##### _.pick(obj, *keys)
选取obj中的特定属性作为新对象返回

##### _.defaults(obj, defaultObj)
`_.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});`  
如果配置的属性值为undefined则添加默认值  

##### _.isEqual(obj, obj2)
判断两个对象是否相等，不是比较引用，而是深度遍历比较





