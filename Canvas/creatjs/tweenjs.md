# TweenJs 笔记
管理动画渐变，补间动画等

>官方文档：[中文文档](http://www.createjs.cc/src/docs/tweenjs/modules/TweenJS.html)  

### 案例
```js
target.alpha = 1;
//等待500ms然后让元素在1000ms内alpha变为0并隐藏
createjs.Tween.get(target).wait(500).to({alpha:0, visible:false}, 1000).call(handleComplete);
```

### Tween - 渐变类
【构造函数】`new Tween(target, [props], [pluginData])`  
推荐使用静态方法来创建该对象实例 `creatjs.Tween.get(target)`，可以传递相同参数，但是这种写法可以直接在之后进行链式操作，更加简洁。  

+ target: 目标对象  
+ props: 属性（所有默认为false） 
  + loop: 是否循环  
  + useTicks: 使用滴答时间不使用毫秒  
  + ignoreGloabalPause: 忽略全局的暂停  
  + paused: 开始时是否暂停  
  + override: true时移除对target的所有渐变动画  
  + position: 渐变的初始位置  
  + onChange: 绑定change回调  
+ pluginData: 共享数据  

【属性】
+ target: 目标对象  
+ postion: 当前播放到的毫秒或滴答数  
+ duration: 总的毫秒或滴答  

【方法】
名称 | 描述
--- | ---
Tween.get() | 如上，获取tween实例  
.call(cb, [params], [scope]) | 链式挂载回调函数，可传递参数及作用域  
.set(props, [target]) | 设置tween实例的props相关属性，如果传递target就设置在target上  
.to(props, [duration=0], [ease='linear']) | 渐变动画，属性为DisplayObject相关属性  .play()/.pause | 播放/暂停  
.wait(time, [passive]) | 停止固定时间   
Tween.removeTweens(target) | 移除所有动画  


### Ease - 集成了一些曲线动画的静态类
用法如`Tween.get(target).to({x: 100}, 500, Ease.linear)`  

> [官方文档](http://www.createjs.cc/src/docs/tweenjs/classes/Ease.html)  

### Ticker - 滴答类
每隔一个间隔就会触发一次tick事件 `createjs.Ticker.addEventListener("tick", handleTick)`  

### Timeline - 时间轴
整合多个tween实例到一个时间轴统一管理。`new Timeline(tweens, [labels], [props])`



