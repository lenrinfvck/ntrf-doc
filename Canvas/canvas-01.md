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
属性 | 内容
---  | ---
.strokeStyle = "#000"   | 描边颜色
.lineWidth = 5      | 描边宽度
.lineCap = butt/round/square    | 线段头，round圆头尾，square方头尾(只作用于整段路径的头尾)
.lineJoin = miter/bevel/round   | 线条相接处样式，miter默认衍生锐化，bevel不衍生直接折叠，round圆角转折
.miterLimit = 10    | 如果miter衔接长度超过limit就采用bevel
.fillStyle = "#000" | 填充颜色

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


####[图形变换]
api | 功能
--- | ---
.translate(x, y)    | 位移,会叠加，可用.save()和.restore()读取无位移的时的状态
.rotate(deg)        | 旋转
.scale(sx, sy)      | 缩放
.transform(a, b, c, d, e, f)    | 矩阵变换

> a c e
> d d f
> 0 0 1
> a,d 水平、垂直缩放
> b,c 水平、垂直倾斜
> e,f 水平、垂直位移