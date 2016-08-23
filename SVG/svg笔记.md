#SVG学习笔记01
##1. 简介  

+ 使用XML描述的矢量文件  
+ W3C标准 ([http://www.w3.org/TR/SVG11/](http://www.w3.org/TR/SVG11/))  
+ 兼容性  
IE 9+, Chrome 33.0+, Firefox 28.0+, Safari 7.0+  

###1.1 使用方式  
+ 浏览器直接打开  
+ 在HTML中`<img>`标签引用
+ 直接在HTML中使用SVG标签
+ 作为CSS背景

###1.2 svg基本标签
####1.2.1 矩形  
`<rect x="posX(以左上角)" y="posY" width="" height="" rx="圆角x" ry="圆角Y">`  

####1.2.2 圆 
`<circle cx="posX(以圆心为基准)"  cy="posY" r="半径">`  

####1.2.3 椭圆
`<ellipse cx="" xy="" rx="" ry="">`

####1.2.4 直线
`<line x1="" y1="" x2="" y2="">`  

####1.2.5 折线  
`<polyline points="x1 y1 x2 y2 x3 y3"> //在points里依次书写`

####1.2.6 多边形 
`<polygon points="x1 y1 x2 y2"> //同折线，最后会链接起点 ` 

###1.3 基本属性  

+ fill = #FFFFFF  填充  
+ stroke = #000  描边  
+ stroke-width = 10  描边宽度  
+ transform = "rotate(30)" 变换属性

###1.4 基本操作API
+ 创建图形  

>document.createElementNS(ns, tagName)

+ 添加图像  

>element.appendChild(childElement)  

+ 设置/获取属性  

>element.setAttribute(name, value)  
>element.getAttribute(name)  


