#文本
##4.1 基本标签
+ **&lt;text&gt;**

    可以使用css的font系属性  
    ```xml
    <text x="50" y="50" dx="10" dy=“10”>文字信息</text>
    ```

    `x,y`  对应的时文字基线位置  
    `dx,dy`  值可为数组dx="20 20 20 20",可使每个字符设定偏移值,每次继承上一个

+ **&lt;tspan&gt;**

    嵌入&lt;text&gt;中使用, 相当于内联
    ```xml
    <text x="50" y="50" dx="10" dy=“10”>
        <tspan fill="red" dx="x">文字<tspan>
        
        <tspan stroke="#000" dy="10">信息<tspan>
    </text>
    ```

##4.2 排版
+ text-anchor - 水平排版
+ dominant-baseline - 垂直排版

##4.3 路径文本
><textPath x="" y="" dx="" dy="">

    <path id="path1" d="M 100 200 Q 200 100 300 200" stroke="#000" fill="none />"  
    <text>
        <textPath xlink:href="#path1">
        路径上的文字
        </textPath>
    </text>





