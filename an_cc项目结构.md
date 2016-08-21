### exportRoot
指向Flash/An中的this根对象

### loader
预加载，结合钩子函数做进度条一类的  
```js
var loader = new createjs.LoadQueue(false);
loader.installPlugin(createjs.Sound);
loader.addEventListener("fileload", handleFileLoad);
loader.addEventListener("complete", handleComplete);
loader.loadManifest(lib.properties.manifest);

loader._numItems 　　　　　　//需要加载的总数量
loader._numItemsLoaded  　　//当前加载到的数量
```


http://www.cnblogs.com/luoeeyang/p/?page=3