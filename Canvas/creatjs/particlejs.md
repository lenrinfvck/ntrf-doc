# particlejs笔记

>源码: [github](https://github.com/ics-creative/ParticleJS)  
>文档：[官方文档(日英)](https://ics-creative.github.io/ParticleJS/docs/index.html#_particlejs_d_.particlejs.colordata)  

## 1.配置信息结构
+ 画布  
+ 发射器  
+ 粒子  

### 1.1 画布初始化
particlejs基于creatJS，实例化对象中能提供一个可嵌入creatJS体系的container实例。  
```js
stage = new createjs.Stage("myCanvas");
particleSystem = new particlejs.ParticleSystem();
//提供一个容器实例供creatjs使用
stage.addChild(particleSystem.container);
```

[Emitter]  
+ emitFrequency 每秒发射数  
+ initialDirection/initialDirectionVariance 发射方向及变化值  
+ initialSpeed/initialSpeedVariance 发射速度和变化值  
+ startX/startY 发射器的中心坐标
+ startXVariance/startYVariance 发射器大小  

[particle]  
+ alphaCurveType 设置透明度变化时的渐变规则，normal为线性，random为抖动  
+ finishAlpha/finishAlphaVariance 结束透明度和变化值  
+ finishScale/finishScaleVariance 结束大小  
+ lifeSpan/lifeSpanVariance 生命周期(帧)  
+ shapeIdList 所要使用的内置的粒子id组成的数组  
+ startAlpha/startAlphaVariance 开始透明度  
+ startColor 开始颜色(内含hue, saturation, luminance等hls属性)  
+ startScale/startScaleVariance 开始大小 

[engine]  
+ accelerationDirection 重力方向  
+ accelerationSpeed 重力速度  
+ blendMode 叠加模式，只支持普通和添加模式  
+ friction 阻力值，摩擦系数  

[system]  
+ importData()/importFromJson() 引入数据  
+ container 使用在createjs中的container实例  
+ clear() 清除画布  
+ dispose() 销毁对象  
+ isPlaying 判断动画播放  
+ pause() 暂停  
+ resume() 重新播放  
+ setData() 设置配置  
+ update() 刷新画布  

### 1.2 画布属性
属性 | 类型 | 描述
--- | --- | ---
width | number | 单位px
height | number | 单位px
bgColor | string | hex颜色，背景颜色

