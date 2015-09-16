#SVG学习笔记02
##3.1 颜色RBG和HSL
>rgb([0-255], [0-255], [0-255])  

>hsl(h, s%, l%)  

h:[0 - 359] 色环  
s:[0 - 100] 饱和度  
l:[0 - 100] 亮度  

>a[0 - 1] 透明度(rgba, hsla)  
或则使用opacity = "0-1"  

##3.2 线性渐变  
>标签 <linearGradient> <stop>  

+ **线性渐变**
```xml
<defs>
    <linearGradient id="grad1" gradientUnits="objectBodundingBox" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FFF" />
        <stop offset="0.5" stop-color="#000" />
        <stop offset="1" stop-color="#FFF" />
    </linearGradient>
</defs>
<rect x="100" y="100" fill="url(#grad1)" width="200" height="150" />
```

属性 | 含义
--- | ---
x1, x2, y1, y2 | 渐变启事和终点，连线为渐变向量,值默认为0-1的比例
&lt;stop&gt; | 渐变驻点， 在渐变向量上添加颜色值

gradientUnits取值 | 含义
---   |   ---
objectBodundingBox | 使用的自身坐标系
userSpaceOnUse | 使用世界坐标系
  
+ **径向渐变**  
```xml 
    <radialGradient id="grad2" cx="0.5" cy="0.5" r="0.5" fx="" fy="">
        <stop offset="0" stop-color="#FFF" />
        <stop offset="0.5" stop-color="#000" />
        <stop offset="1" stop-color="#FFF" />
    </radialGradient>
    //用法同线性
```

属性 | 含义
--- | ---
cx, cy| 整体偏移
fx, fy| 中心点相对局部偏移

##3.3 笔刷  
><patterm id="p1" x="0" y="0" width="0.2" height="0.2">

可以在每个笔刷标签里写好svg组合图形，然后可用于平铺填充其他图形

```xml
<patterm id="p1" x="0" y="0" width="0.2" height="0.2" patternUnits="" patternContentUnits="">
    <circle></circle>
    <polyline></polyline>
</patterm>
```
 