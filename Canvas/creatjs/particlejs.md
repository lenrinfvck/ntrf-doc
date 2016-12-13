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



