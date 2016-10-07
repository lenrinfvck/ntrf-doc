### 高分屏适应

```js
var myCanvas = document.getElementById("myCanvas");
 
// 1. canvas要素のwidth属性とheight属性をdevicePixelRatio分だけ拡大する。
myCanvas.width *= devicePixelRatio;
myCanvas.height *= devicePixelRatio;
 
// 2. canvas要素のstyle属性のwidthとheightをdevicePixelRatio分だけ縮小する。
myCanvas.style.width = String(myCanvas.width / devicePixelRatio) + "px";
myCanvas.style.height = String(myCanvas.height / devicePixelRatio) + "px";
```