# Vue技术栈
### 模板相关
#### 绑定
+ {{单向绑定}}, v-bind:data="value", :data="value" 
+ v-model="双向绑定"  
+ v-on:click="绑定事件", @click="method"  
+ {{* 单次绑定 }} 、 v-once  
+ {{{ 不转义html }}} 、 v-html  
+ {{ ok ? 'YES' : 'NO' }}, {{ msg.split(''),reverse().join('') }}  

#### 常用指令

### 过滤器
`Vue.filter(id, {read: fn, write: fn})` 创建过滤器


### 生命周期
#### Vue.nextTick(cb)
在下次DOM刷新后执行cb，用于结合操作DOM  

### 数据监听
+ `Vue.set(obj, key, value)` 设值，强制触发更新   
+ `Vue.delete(obj, key)` 删除，强制触发更新  

  

### 组件
`Vue.component('my-com', Vue.extend({}))` 创建组件  

### 插件
`Vue.use(plugin, [options])` 使用插件  

#### vue-router
#### vue-resource
#### 插件编写相关 - mixin更改vue对象，为vue实例添加额外属性方法

### Config
+ `Vue.config.debug = true;` 调试模式  
+ `Vue.config.delimiters = ['${', '}']` 插值标记  
+ `Vue.config.unsafeDelimiters = ['{!!', '!!}']` 不转义html标记  
+ `Vue.config.silent = true` 关闭日志，警告  