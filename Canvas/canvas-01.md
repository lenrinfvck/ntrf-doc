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
.fillStyle = "#000" | 填充颜色

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



