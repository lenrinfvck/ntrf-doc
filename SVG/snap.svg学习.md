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
rect.append( title );
// 原生方式
var title = document.createElementNS('http://www.w3.org/2000/svg','svg');
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

