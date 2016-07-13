# 一些常用技巧

#### 图片预加载
```js
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

#### 图片加载失败时替换图片
一般直接显示alt的值，但可以用以下技巧替换为站位图
```js
$('img').one('error', function () {
    $(this).prop('src', 'img/broken.png');
});
$('img').load(function() {
    $(this).unbind('error');
});
```
亦可使用lazyload

#### :contains选择器能查找内容文字
```js
var search = $('#search').val();
$('div:not(:contains("'+search+'"))').hide();
```

