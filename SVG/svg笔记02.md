#SVG学习笔记02
##2. 坐标系统

###2.1 SVG中得世界、视野、视窗  
+ width, height - 控制视窗
+ svg代码 -定义世界
+ viewBox，preserveAspectRatio - 控制视野(相当于AE摄像机)  

####2.1.1 视野viewBox
>是svg标签的属性 <svg viewBox="">

viewBox="x, y, width, height"   
x:左上角横坐标，y:左上角纵坐标，width:宽度，height:高度  

####2.1.2 preserveAspectRatio  
>是svg标签的属性 <svg preserveAspectRatio=""> 且须有viewBox  

+ 参数1（对齐方式）  

Value | Feature  
---   |   ---  
xMin  | viewport和viewBox左边对齐(即对齐视窗的offsetX最小值)
xMid  | viewport和viewBox x轴中心对齐  
xMax  | viewport和viewBox右边对齐  

YMin,YMid,YMax同理, 和x组合，xMaxYMax，xMidYMid  

+ 参数2（拉伸方式）  

Value | Feature  
---   |   ---  
meet  | 保持纵横比缩放viewBox适应viewport
slice | 保持纵横比同时比例小的方向放大填满viewport  
none  | 扭曲纵横比以充分适应viewport  

###2.2 分组  
+ <g>标签创建
+ 属性集成
+ 可嵌套
+ transform来修改整体位移  

###2.3 坐标系统 
+ **用户坐标系**  
原始/世界坐标系，不修改viewBox时svg左上为(0,0)  

+ **自身坐标系**  
如一个矩形的x,y为它的自身坐标  

+ **前驱坐标系**  
父级坐标系

+ **参考坐标系**  
相对于其他坐标系时的坐标值，如参考用户坐标系的话，就是世界绝对坐标位置  

###2.4 坐标系线性变换 - transform
>transfrom属性

+ translate(x, y)
+ rotate(r)
+ scale(sx, sy)
+ matrix(a, b, c, d, e, f)


