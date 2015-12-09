#Canvas图像处理

###加载图片
`ctx.drawImage(image[, x, y, w, h])`  
其中image也可为canvas

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var image = new Image();

image.src = "img.jpg";
image.onload = function() {
    //在canvas中绘制图片
    ctx.drawImage(image, x, y);
}
```

`ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`  
s为原素材，d为输出目标。设置s4参数相当于截取了图片的一个矩形区域，局部输出。  

###