### Constructor
+ 解析支持的6种格式`rgba(r,g,b,a)`, `rbg()`, `white`, `hsl`, `hsla`, `hex`  
+ `.rgba(r, g, b, a/[r, g, b, a])`形式转化已分离的数据  
+ 自身实例

### prop
+ `red/green/blue/alpha/hue/saturation/lightness` 存储对应值

### Getter/Setter
+ `.rgba()/.hsla()/.hex()` 的形式修改实例对象的当前展示类型
+ `.object()/.array()/.toString()` 链式操作将展示类型输出 `{r: 0, g: 0, b: 0}/[0, 0, 0]/rgb(0, 0, 0)`  
+ `.red()/.alpha()/.hue()` 返回对应数值  

### Methods
+ `.darken()/.lighten()/.saturate()/.desaturate()` 将颜色转化为hsl并调整sl  
+ `._update()` 刷新存储的基本值，调用对应set后

### code
```js
hextoRGB: function(hex) {
    hex = hex.toUpperCase();
    if (hex.length === 4) {
        hex = '#' + hex.slice(1, 2) + hex.slice(1, 2) + hex.slice(2, 3) + hex.slice(2, 3) + hex.slice(3, 4) + hex.slice(3, 4);
    }
    if (hex.charAt(0) == "#") {
        hex = hex.substring(1, hex.length);
    }
    var rgb = new Array(3);
    rgb[0] = hex.substring(0, 2);
    rgb[1] = hex.substring(2, 4);
    rgb[2] = hex.substring(4, 6);
    rgb[0] = parseInt(rgb[0], 16);
    rgb[1] = parseInt(rgb[1], 16);
    rgb[2] = parseInt(rgb[2], 16);
    isNaN(rgb[0]) && (rgb[0] = 0);
    isNaN(rgb[1]) && (rgb[1] = 0);
    isNaN(rgb[2]) && (rgb[2] = 0);
    return rgb;
},
```
