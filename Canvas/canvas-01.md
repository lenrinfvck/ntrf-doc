#Canvas

###使用
>标签： `<canvas id="canvas" width="800" height="600"></canvas>`  

```html
   <canvas id="canvas" width="800" height="600">
       此处可写上不支持canvas的显示内容
   </canvas>
   <!-- css中控制width/height只会控制标签block的宽度，无法控制绘图大小 -->
```


###基础绘图

####[直线绘制]
#####context属性
线属性 | 内容
---  | ---
.strokeStyle = "#000"   | 描边颜色
.lineWidth = 5      | 描边宽度
.lineCap = butt/round/square    | 线段头，round圆头尾，square方头尾(只作用于整段路径的头尾)
.lineJoin = miter/bevel/round   | 线条相接处样式，miter默认衍生锐化，bevel不衍生直接折叠，round圆角转折
.miterLimit = 10    | 如果miter衔接长度超过limit就采用bevel


>颜色支持：
>   #fff
>   #642
>   rgb(r, g, b)
>   rgba(r, g, b, a)
>   hsl()
>   hsla()
>   red

#####context方法
api | 功能
--- | ---
.moveTo(x, y)   | 绘图光标移动
.lineTo(x, y)   | 生成当前光标位置到x,y的路径
.stroke()       | 根据当前路径绘制描边
.fill()         | 根据当前路径填充闭合区域，会首位链接
.beginPath()    | 结合.closePath()包裹路径，被包裹的路径只会存在至下一次绘图，可以不使用close，使用close时会把该路径闭合
.clearRect(x, y, width, height)     | 清楚矩形区域内的绘图

####[弧线绘制]
`contex.arc(centerx, centery, radius, startingAngle, endingAngle, anticlockwise)`

参数  | 内容
---   | ---
centerx/y | 弧线中点
radius    | 半径
startingAngle | 初始角度(0时为坐标向右方向), 默认单位和pi，1pi为180度
endingAngle | 结束角度
anticlockwis = false | 默认为顺时针，true为逆时针

####[矩形绘制]
api | 功能
--- | ---
.rect(x, y, width, height)   | 绘制矩形路径
.fillRect(x, y, w, h)   | 绘制填充矩形
.strokeRect(x, y, w, h) | 绘制描边矩形

`context.arcTo(x1, y1, x2, y2, radius);`
相切于起点与1、2点的2条直线的圆弧，可以理解为将一个半径为rdius的圆移动至这两线夹角处直到卡住。  
两线类似于这段弧的两个贝塞尔控制柄，交点为控制点。


####[图形变换]
api | 功能
--- | ---
.translate(x, y)    | 位移,会叠加，可用.save()和.restore()读取无位移的时的状态
.rotate(deg)        | 旋转
.scale(sx, sy)      | 缩放
.transform(a, b, c, d, e, f)    | 矩阵变换
.setTransform(a, b, c, d, e, f) | 清除之前的矩阵变换，再进行设置的值变换

> a c e
> d d f
> 0 0 1
> a,d 水平、垂直缩放
> b,c 水平、垂直倾斜
> e,f 水平、垂直位移

####[fillStyle]填充渐变和图片
值 | 效果
\#000（颜色值）   | 纯色填充
linearGrad      | 渐变

#####渐变书写方式
```js
//线性渐变
var linearGrad = context.LinearGrandient(x1, y1, x2, y2);
linearGrad.addColorStop(0.0, "white");
linearGrad.addColorStop(0.3, "yellow");
linearGrad.addColorStop(1.0, "green");
context.fillStyle = linearGrad;
context.fillRect(0, 0, 800, 800);
```

```js
//径向渐变
//r0为0时为点向外的径向渐变
var grd = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
grd.addColorStop(0.0, "white");
grd.addColorStop(0.4, "yellow");
context.fillStyle = radiaGrad;
context.fillRect(0, 0, 800, 800);
```

```js
//图片填充(canvas/Image/video, repeat-style);
//可以用图片或canvas填充，repeat有no-repeat/repeat-x/repeat-y/repeat
var bgImage = new Image();
bgImage.src = "../image/xxx.jpg";
bgImage.onload = function() {
    var bg = context.createPattern(bgImage, "no-repeat");
    context.fillStyle = pattern;
    conrext.fillRect(0, 0, 800, 800);
}
```

####贝塞尔
演示连接:[http://tinyurl.com/html5bezier](http://tinyurl.com/html5bezier)  

#####二次贝塞尔
```js
    context.moveTo(x0, y0);
    context.quadraticCurveTo(x1, y1, x2, y2);
```

#####三次贝塞尔
```js
    context.moveTo(x0, y0);
    context.bezeirCurveTo(x1, y1, x2, y2, x3, y3);
```

####[文字渲染]
#####文字基本属性
```js
    //font = font-style font-variant font-weight font-size font-family
    //variant = normal/small-caps    samllcaps会把小写字母换成小号的大写字母
    context.font = "bold 40px Arial"; /*默认 为20px sans-serif*/
    context.fillStyle = "#058";
    //string - 字符串
    //x，y - 文字输出起始位置
    //maxlen - 文字最长占位，超出时会压缩文字宽度
    context.fillText(string, x, y, [maxlen]);
    context.strokeText(string, x, y, [maxlen]);
```

#####textAlign
`context.textAlign()`









