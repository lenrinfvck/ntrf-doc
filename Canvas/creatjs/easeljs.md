# EaselJs 笔记
>官方文档：[中文文档](http://www.createjs.cc/easeljs/docs/modules/EaselJS.html)  

### 绘图流程
创建舞台，容器 -> 创建`DisplayObject`相关实例并添加

### DisplayObject - 展示元素基类
【Props】
属性 | 限制 | 描述
--- | --- | ---
alpha   | Number[0~1]   | 透明度  
id      | Number        | 元素id  
name    | String        | 元素名称  
visible| Boolean        | 是否可见  
cursor  | String[同Css]  | 指针样式  
x, y    | Number[px]     | 相对于父级的坐标位置  
regX, regY | Number[px]  | 旋转中心点  
scaleX， scaleY| Number[默认1] | 缩放
rotation| Number        | 旋转角度  
parent  | obj[readOnly] | 父级容器或则stage  
mask    | Obj[Shape]    | 遮罩对象  
shadow  | Obj[Shadow]   | 阴影  
hitArea | Obj[DisplayObject] | 点击区域  
stage   | Obj[readOnly] | 返回添加进的那个stage实例，没有添加时为null  

【Methods】
方法 | 描述
--- | ---
addEventListener | 同原生  
off/removeEventListener | 注销事件监听  
on  | 能传递跟多可配置项的绑定事件  
dispatchEvent(event) | 发送广播事件  
clone | 复制该实例  
draw(ctx, [ignoreCache=false]) | 将元素画到ctx画布上  
setTransform(x, y, sX, sY) | 设置变换属性  
getBounds()  | 获取矩形边界 x,y,w,h的对象
setBounds(x, y, w, h) | Shape等无法获取，但可以设置  
globalToLocal(x, y) | 把全局坐标转换为相对于该实例的坐标  
localToGloball(x, y) | 与上相反  

【Events】
事件 | 描述
--- | ---
added   | 该元素被添加后触发  
pressmove | mousedown后滑动时触发
pressup | 滑动释放  
removed | 广播这个元素被删除  
tick | stage渲染时触发，重绘或则追加绘制时  

### Bitmap - 位图
【构造函数】 `new createjs.Bitmap(imageOrUri)`  
`imageOrUri HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | String`  
  
【私有属性方法】
名称 | 描述
--- | --- 
image | 存储的img对象或则canvas,video对象  

### Graphics - 矢量对象
【构造函数】 `new createjs.Graphics()`  
创建后调用各种方法进行绘制。  
待补充

### Shape - 形状对象
【构造函数】 `new createjs.Shape(Graphics)`  
参数是一个矢量形状对象，由于Graphics只是纯粹提供矢量绘图。而Shape提供了一次包装，从而能使用DisplayObject中的对图形对象的一些基本操作。  

### SpriteSheet - 雪碧图基类
【构造函数】
```js
var data = {
    images: ["sprites.jpg"],
    frames: {width:50, height:50},
    animations: {
        stand:0,
        run:[1,5],
        jump:[6,8,"run"]
    }
};
var spriteSheet = new createjs.SpriteSheet(data);
```


