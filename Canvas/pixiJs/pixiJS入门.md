# pixiJS入门

## 1. helloworld
```js
//创建画布
var renderer = PIXI.autoDetectRenderer(256, 256);
//创建用于放置其他元素的舞台
var stage = new PIXI.Container();
//画布中的view属性是一个canvas的DOM
document.body.appendChild(renderer.view);
//绘制某个Container中的所有元素
renderer.render(stage);
```

### .autoDetectRenderer(width, height, [obj])
可选参数obj  
```js
{
    antialias: false,   //圆滑文字
    transparent: false, //canvas背景透明
    resolution: 1       //几倍屏
}
```


