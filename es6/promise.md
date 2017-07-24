# Promise相关

## 根据基本用法自己实现
```js
function MyPromise(fn) {
    this.fn = fn;
}

MyPromise.prototype = {
    resolve: function() {
        var res;
        var arg = [].slice.call(arguments);
        typeof(this.cb) === 'function' && (res = this.cb.apply(null, arg));
    },
    then: function(cb) {
        this.fn.call(this);
        this.cb = cb;
    }
}
```

```js
var ha = new MyPromise(function(resolve) {
    var _this = this;
    setTimeout(function() {
        _this.resolve(666);
    }, 2000);
});
ha.then(function(data) {
    console.log(data);
})
```





