# snap.svg笔记
## 参考资料
> [官方API文档](http://snapsvg.io/docs/)  
> [API中文部分翻译](http://www.zhangxinxu.com/GitHub/demo-Snap.svg/demo/basic/Snap.php)  
> [snap入门](https://aotu.io/notes/2017/01/22/snapsvg/?o2src=juejin&o2layout=compat)  
> [snap案例(重点)](http://svg.dabbles.info)  

## hellow snap

```js
var s = Snap("#svgout"); 
var r = s.rect(100,50,200,100,20,20).attr({ 
        'stroke': '#123456', 
        'strokeWidth': 20, 
        'fill': 'red', 
        'opacity': 0.2 
    });
var t = s.text(140,100,'hellow snap.svg');
```

## 类库结构
+ `Snap` 全局类库；构造、选择svg根节点；挂在类一些静态工具方法  
+ `Element` 选择器；svg-dom及属性操作；事件绑定  
+ `Matrix` 节点变换，用于操作transform可支持的各种属性  
+ `Paper` 创建svg图形节点，用于创建svg各种标签  
+ `Set` 数组遍历方法等  
+ `mina` 动画曲线函数  
+ `Filter` 滤镜  

## 技巧
### Snap.parse(str)
把svg字符串转化成svg节点对象  

```js
var title = Snap.parse('<title>This is a title</title>');
rect.append(title);
// 原生方式
var title = document.createElementNS('http://www.w3.org/2000/svg','title');
title.addChild(document.createTextNode('This is a title 2'));
rect.addChild(title);
```

### Matrix实例
可以传递复数变化，生成一个matrix矩阵变化便于使用  
```js
var m = new Snap.Matrix();
    m.translate(100, 200);
    m.rotate(50);
    rect.transform(m);
    // 创建一个可用于还原的反向矩阵变换
    invert_m = m.invert()
```

### strokeDashoffset/strokeDasharray  
虚线描边中offset属性可以做路径描绘动画  

### plugin 插件扩展
```js
Snap.plugin(function(Snap, Element, Paper, global) {
    Snap.prototype.xxx = function(){};
    Element.prototype.xxx = function(){};
    //...
});
```

### preload实现
```js
Snap.plugin( function( Snap, Element, Paper, global ) {

  function addLoadedFrags( whichSVG, fragList, runWhenFinishedFunc ) { // This is called once all the loaded frags are complete
    for( var count = 0; count < fragList.length; count++ ) {
        myEl = whichSVG.append( fragList[ count ] );
    }
    runWhenFinishedFunc();
  }

  Paper.prototype.loadFilesDisplayOrdered = function( list, afterAllLoadedFunc, onEachElementLoadFunc ) {
     var image, fragLoadedCount = 0, listLength = list.length, fragList = new Array(), whichSVG = this;

      for( var count = 0; count < listLength; count++ ) {
        (function() {
          var whichEl = count,
          fileName = list[ whichEl ],
          image = Snap.load( fileName, function ( loadedFragment ) { 
               fragLoadedCount++;
               onEachElementLoadFunc( loadedFragment, fileName );
               fragList[ whichEl ] = loadedFragment;
               if( fragLoadedCount >= listLength ) {
                  addLoadedFrags( whichSVG, fragList, afterAllLoadedFunc );
               }
            } );  
        })();
     }
  };

});
```

### path.isPointInside - 检测点是否在一段路径内
`Snap.path.isPointInside(path, x, y)`  

### el.toDefs - 转化为def标签的复用内容
```js
var myDef = someSvg.toDefs();
var copyGuy = myDef.use();
```

### el.getBBox - 获取元素外层布局框的信息
如能获取到x,y,w,h,cx,cy等  

### 插件
+ [延路径运动 animate-object-path](http://svg.dabbles.info/animate-object-path.js)  
+ [思维导图 graffle](http://raphaeljs.com/graffle.html)  
+ [拖拽自由变换 freeTransform](https://github.com/ibrierley/Snap.svg.FreeTransform)  
