# pixiJS入门

## 1. helloworld
```js
//创建画布
let renderer = PIXI.autoDetectRenderer(256, 256);
//创建用于放置其他元素的舞台
let stage = new PIXI.Container();
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

## 2. Sprite
### 2.1 创建Sprite
Sprite的实例是一个基本的活动元素，创建需要依靠材质对象(texture)，有以下三种获得材质：  
+ 通过图片文件，或雪碧图创建  
+ 通过DOM的Image对象创建  
+ 通过材质描述文件(json)创建  

#### 通过loader对象加载图片并创建sprite
```js
PIXI.loader
    .add("qibi", "./qibi.png")  //加载文件
    .load(start);  //文件加载完成回调
function start() {
    // 通过loader加载器加载的图片皆可在.resouce下获取
    let texture = PIXI.loader.resource["./qibi.png"].texture;
    let sprite = new PIXI.Sprite(texture);
}
```
其中loader的.add有如下几种用法：
```js
//加载多张个的两种方式
PIXI.loader
    .add("images/imageOne.png")
    .add("images/imageTwo.png")
    .load(cb);
PIXI.loader
  .add([
    "images/imageOne.png",
    "images/imageTwo.png"
  ])
  .load(setup);
  //设置文件别名，可loader.resources.catImage方式访问
  .add("catImage", "images/cat.png")
  //进度事件，每加载完成一个文件触发一次
  //loader.progress当前进度；resource.url文件路径
  .on("progress", cb(loader, resource))
```

#### 使用创建的sprite
```js
//添加sprite实例到container对象
stage.addChild(sprite)
//渲染当前container的所有元素
renderer.render(stage);
```

#### 其他创建方式
已有的DOM对象  
```js
//当使用DOM上的Image对象时
let base = new PIXI.BaseTexture(anyImageObject),
    texture = new PIXI.Texture(base),
    sprite = new PIXI.Sprite(texture);
//使用Canvas对象
let base = new PIXI.BaseTexture.fromCanvas(anyCanvasElement);
//切换texture
sprite.texture = PIXI.utils.TextureCache["anyTexture.png"];
```

雪碧图  
```js
//假设加载了一个雪碧图材质
var texture = TextureCache["images/tileset.png"];
//创建一个矩形(x, y, w, h)
var rectangle = new PIXI.Rectangle(192, 128, 64, 64);
//把材质的当前帧设为该矩形区域
texture.frame = rectangle;
var rocket = new Sprite(texture);
```

json描述文件，类似如下结构，一张雪碧图然后用json去描述每个图片文件  
```js
"blob.png":
{
    "frame": {"x":55,"y":2,"w":32,"h":24},
    "rotated": false,
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":32,"h":24},
    "sourceSize": {"w":32,"h":24},
    "pivot": {"x":0.5,"y":0.5}
}
//加载json后
var sprite = new Sprite(
  resources["images/treasureHunter.json"].textures["blob.png"]
);
```

### 2.2 Sprite实例相关
属性 | 描述
--- | ---
x/y | get/set位置

【略 - 思维导图】


## 3. 动画
pixijs有引入一个全局方法requestAnimationFrame，会以60fps去调用回调
```js
function gameLoop() {
  requestAnimationFrame(gameLoop);
  qibi.y += 0.2;
  qibi.x += 1;
  renderer.render(stage);
}
gameLoop();
```

## 4. 交互
显示元素是可以绑定基本事件的：  
```js
sprite.interactive = true;
sprite.on('touchstart, cb');
```






