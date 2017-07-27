>[MDN-颜色文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)  
>[wiki-HSL描述](https://en.wikipedia.org/wiki/HSL_and_HSV)  
>[wiki-rgb描述](https://en.wikipedia.org/wiki/RGB_color_model#Geometric_representation)  
>[博客-颜色转换](http://www.zhangxinxu.com/wordpress/2010/03/javascript-hex-rgb-hsl-color-convert/)  


### Constructor
+ 解析支持的6种格式`rgba(r,g,b,a)`, `rbg()`, `white`, `hsl`, `hsla`, `hex`  
+ `.rgba(r, g, b, a/[r, g, b, a])`形式转化已分离的数据  
+ 自身实例  

### prop
+ `red/green/blue/alpha/hue/saturation/lightness` 存储对应值  
+ `type` ['rgb', 'hsl']表示颜色类型  

### Getter/Setter
+ `.rgba()/.hsla()/.hex()` 的形式修改实例对象的当前展示类型  
+ `.object()/.array()/.toString()` 链式操作将展示类型输出 `{r: 0, g: 0, b: 0}/[0, 0, 0]/rgb(0, 0, 0)`  
+ `.red()/.alpha()/.hue()` 返回对应数值  

### Methods
+ `.darken()/.lighten()/.saturate()/.desaturate()` 将颜色转化为hsl并调整sl  
+ `.formatter('rgb'/'hsl')`  追加 `toArray()/toObject()`
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

/**
 * HSL颜色值转换为RGB. 
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, 和 l 设定在 [0, 1] 之间
 * 返回的 r, g, 和 b 在 [0, 255]之间
 *
 * @param   Number  h       色相
 * @param   Number  s       饱和度
 * @param   Number  l       亮度
 * @return  Array           RGB色值数值
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * RGB 颜色值转换为 HSL.
 * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内
 * 返回的 h, s, 和 l 在 [0, 1] 之间
 *
 * @param   Number  r       红色色值
 * @param   Number  g       绿色色值
 * @param   Number  b       蓝色色值
 * @return  Array           HSL各值数组
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
```
