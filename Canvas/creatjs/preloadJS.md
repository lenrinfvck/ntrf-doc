# PreloadJS笔记
预加载各种资源文件  
>官方文档：[中文文档](http://www.createjs.cc/src/docs/preloadjs/modules/PreloadJS.html)  

### 示例
```js
 var queue = new createjs.LoadQueue();
 queue.installPlugin(createjs.Sound);
 queue.on("complete", handleComplete, this);
 queue.loadFile({id:"sound", src:"http://path/to/sound.mp3"});
 queue.loadManifest([
     {id: "myImage", src:"path/to/myImage.jpg"}
 ]);
 function handleComplete() {
     createjs.Sound.play("sound");
     var image = queue.getResult("myImage");
     document.body.appendChild(image);
 }
```

### LoadQueue类  
【构造函数】 `var queue = new createjs.LoadQueue([preferXHR=true],[basePath=""], [crossOrigin=""] )`  

###### 【Event】
+ complete: 文件加载完成时  
+ error: 任何文件加载错误时  
+ progress: 队列加载有进展时  
+ fileload: 单个文件完成加载时  
+ fileprogress: 单个文件进度变化  

###### 方法
+ `.loadFile(url/opt)` : 添加单个文件到队列  
+ `.loadManifest(arr)` : 参数为上一个方法参数组成的数组  

加载文件时会根据文件后缀自动判断类型，当类型不明时可以通过主动传递type属性复制。  
支持的type存储于`createjs.AbstractLoader`，如`AbstractLoader.SOUND`代表音频文件

###### 回调参数  
在文件加载完成Fileload事件时，根据不同文件type返回结果不同，如音频文件返回一个`<audio>`标签的dom对象，可通过回调参数`event.result`访问  





