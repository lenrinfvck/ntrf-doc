# threejs笔记
> [在线教程](http://www.hewebgl.com/article/articledir/1)  
> [github](https://github.com/mrdoob/three.js/tree/master)  
> [英文文档](https://threejs.org/docs/) [中文文档](http://techbrood.com/threejs/docs/)  
> [模型素材 - sketchup](http://sketchup.google.com/3dwarehouse/)  

## 1.hello threejs
```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material); scene.add(cube);
camera.position.z = 5;
function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render(scene, camera);
}
render();
```
需要渲染出结果需要`scene,camera,renderer`，`renderer.domElement`挂载canvas的dom，使用`.render(scene, camera)`传入所需使用额场景和摄像机即可显示。  

## 2. Camera - 摄像机
分为两个子类`THREE.OrthographicCamera`（正交）和`THREE.PerspectiveCamera`（透视）。  
创建实例后在`rendere.render(scene, camera)`使用即可。  
### 2.1 正交投影相机
`OrthographicCamera( left, right, top, bottom, near, far )`  
6个参数分别对应长方体空间（视景体）6面到摄像机中心的垂直距离，这类摄像机没有透视效果，构建的长方体截断scene空间以显示。  

### 2.2 透视投影相机
`PerspectiveCamera( fov, aspect, near, far )`  
+ fov 视角  
+ aspect 宽高比  
+ near 近平面  
+ far 远平面  

## 3. Light - 光源
+ `THREE.AmbientLight(hex, intensity)` 环境光  
    + hex 颜色 
    + intensity 光强 (默认1.0)   
+ `THREE.PointLight(hex, intensity, distance)` 点光源
    + distance 光距 ，达到光距后光强衰减为0.0。 (默认0，为0时表示光不衰减)  
+ `THREE.SpotLight(hex, intensity, distance, angle, penumbra, decay)` 聚光灯  
    + angle 聚光灯角度(值为弧度值)  
    + penumbra 聚光锥中心到边缘的衰减(0-1)  
    + decay 光照距离衰退量  
+ `THREE.DirectionalLight(hex, intensity)` 平行光

## 4. Material/Texture - 材质和纹理  
### 4.1 材质使用
`var material = new THREE.MeshLambertMaterial( { color:0x880000} );` 创建兰伯特材质  

### 4.2 纹理使用
`THREE.Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )`  
+ image 图片对象，通过`var image = THREE.ImageUtils.loadTexture(url)` 方式加载  
+ mapping 纹理坐标，`THREE.UVMapping()`  
+ wrapS/wrapT x,y轴回环方式，贴图不够时的平铺模式  
+ magFilter/minFilter 过滤的方式  
+ format 图片格式，`THREE.RGBAFormat，RGBFormat`  
+ type 纹理存储的字节格式，默认为`THREE.UnsignedByteType`  
+ anisotropy 各向异性过滤


## 技巧
### 1.fps显示
```js
var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms
// 将stats的界面对应左上角
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
requestAnimationFrame(function() {
    //...
    stats.update();
});
```