# Vue笔记
### hello world 双向绑定
[html]    
```html
<div id="app">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```
[js]  
```js
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
});
```

### 一. Vue实例
使用Vue构造函数创建，其属性方法如下：  
```js
var data = { a: 1 }
var vm = new Vue({
  data: data  //存取的引用
});
vm.data === data;
//$前缀是一些基本属性的隐藏别称
vm.$data === data;  
```

实例生命周期中的回调钩子：
```js
var vm = new Vue({
    data: {
        a: 1
    }
    created: function() {
        //this指向vm实例
        console.log(this.a);
    }
});
//created实例创建后，之后依次是compiled、ready、destroyed等
//compiled: 根据实例替换模板中的参数后，未插入dom
//ready: 将编译的结果插入dom后
```

### 二. 数据绑定
##### 插值
字符串输出  
```html
<span class="cls-{{ msg }}" >{{ msg }}</span>
//这种写法能使插值后解除绑定
<span>{{* msg }}</span>
```
HTML字符串  
`<div>{{{ test_html }}}</div>`，这种方式不会转义html字符串而是直接插入html  

##### 绑定表达式
```js
//以下写法均可
{{ num + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ msg.split(''),reverse().join('') }}
//if语句是无效的，使用三元表达式
```

##### 过滤器
基本写法如下:  
```js
{{ message | capitalize }}
{{ message | filterA | filterB }}  //多级
{{ message | filterA 'arg1' arg2 }} //参数,fn(msg, 'arg1', arg2)
```


##### 指令
`v-`的一些标签属性，如`<p v-if="data1"></p>`  
```html
//带参数：有些指令带有参数，如bind可以指定绑定的属性
<a v-bind:href="url"></a>
<a v-on:click="fn1"></a>

//带修饰符：以.连接的后缀
<a v-bind:href.literal="/a/b/c"></a> //此句为不解析，直接原样输出

//缩写
<a :href="url"></a>
<button :disabled="someDynamicCondition">Button</button>

<a @click="doSomething"></a> //事件缩写用@
```

### 三.计算属性
当某个数据需要根据其他数据而改变结果时，可以使用计算属性  
```js
//如下方式的b会随着a的改变而变化
var app = new Vue({
    el: "#app",
    data: {
        a: 1
    },
    computed: {
        b: function() {
            return parseInt(this.a) + 1
        }
    }
});
```
#### vs.$watch
用于监测某属性
```js
var vm = new Vue({
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  }
})

vm.$watch('firstName', function (val) {
  this.fullName = val + ' ' + this.lastName
})

//可以替换为计算属性的方式  
data: {
    firstName: 'Foo',
    lastName: 'Bar'
},
computed: {
    fullName: function () {
        return this.firstName + ' ' + this.lastName
    }
}
```

#### 计算属性的setter
```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

### 四.Class和Style
#### v-bind:class
绑定的是一个对象，写法一：  
```html
<div class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>
data: {
  isA: true,
  isB: false
}
//结果
<div class="static class-a"></div>
```
写法二：  
```html
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    'class-a': true,
    'class-b': false
  }
}
```
写法三(数组)：  
```html
<div v-bind:class="[classA, classB]">
data: {
  classA: 'class-a',
  classB: 'class-b'
}
//三元
<div v-bind:class="[classA, isB ? classB : '']">
```

#### v-bind:style
绑定内链样式，vue能自动添加前缀    
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
//同样有绑定对象和数组写法
<div v-bind:style="styleObject"></div>
styleObject: {
    color: 'red',
    fontSize: '13px'
}
<div v-bind:style="[styleObjectA, styleObjectB]">
```

### 五.条件和列表渲染
#### v-if
```html
//可以结合v-else
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>

//可以template打包使用指令，该标签最后不会渲染出来
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
</template>
```

#### v-show
通过修改display，`v-if`是移除了DOM元素  

#### v-for
用于遍历数组数据(1.0.17后可使用of替换in)  
```html
<li v-for="item in items">
    {{ item.message }}
    //该作用域内有$index属性，和与数组数据同级的其他属性等
    {{ parentMessage }} - {{ $index }} - {{ item.message }}
</li>
//别名
<div v-for="(index, item) in items">
  {{ index }} {{ item.message }}
</div>

//包裹
<template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
</template>
```

##### 数组黑科技
+ 数组变动检测：vue数据中的数组的基本操作方法得到封装，使用后能传递数据改变事件；  
+ 数组替换：数据中数组被重新赋值后界面不会完全重新渲染，这个过程是较为高效的；  
+ track-by：`<div v-for="item in items" track-by="_uid">`这种方式书写后，能时vue能检测item中的_uid属性来实现DOM最大化复用；  
+ $set：`example1.items[0] = ...` 不会更新视图，需要使用`example1.items.$set(0, { childMsg: 'Changed!'})`；  
+ $remove：`this.items.$remove(item)`能内部调用`splice(index, 1)`能触发变动事件； 

##### 遍历对象时
排序按照Object.keys()来的，不同引擎下有区别  
```html
<li v-for="value in object">
    {{ $key }} : {{ value }}
</li>
```

##### 值域 v-for
`<span v-for="n in 10">{{ n }} </span>`  

### 六.事件绑定
使用`v-on:click`或`@click`的方式绑定方法，方法有event回调参数  
```js
methods: {
    greet: function (event) {
      // 方法内 `this` 指向 vm
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      alert(event.target.tagName)
    }
}
//内联方式
<button v-on:click="say('hi')">Say Hi</button>
//内链的第一回调参数被限制了，需要使用的话手动传入$event
<button v-on:click="say('hello!', $event)">Submit</button>
```

使用修饰符替代`event.preventDefault()`或`event.stopPropagation()`
```html
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat">
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```

按键修饰符
```html
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
<!-- 同上 -->
<input v-on:keyup.enter="submit">
```

### 七.表单控件
一般使用`v-model`绑定表单控件与指定数据  
```html
<input type="text" v-model="message" placeholder="edit me">
<input type="checkbox" id="checkbox" v-model="checked">
<input type="radio" id="one" value="One" v-model="picked">
//复选时，checkedNames: []
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<input type="checkbox" id="john" value="John" v-model="checkedNames">
//Select
<select v-model="selected">
  <option selected>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

#### value属性绑定
```html
//动态绑定，在不同状态下value可以不同
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b">
```

#### 参数特性
```html
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model="msg" lazy>
<!-- 强制输入数字 -->
<input v-model="age" number>
<!-- 延时500ms再同步，这种方式只是延时了vue内部，需要使用vm.$watch来检测 -->
<input v-model="msg" debounce="500">
<!-- 使用过滤器，这样直接可以使事件延迟触发 -->
<input @keyup="onKeyup | debounce 500">
```

### 过渡动画  
`transition`属性：
+ `v-if`  
+ `v-show`  
+ `v-for`(插入和删除时)  
+ 动态组件  
+ Vue实例操作DOM（如`vm.$appendTo(el)`）  

#### 使用方式  
如`<div v-if="show" transition="test">`  
vue会自动添加`test-transition`，`test-enter`，`test-leave`三个class，结合css3使用  

```js
//js方式控制
Vue.transition('expand', {
    //选择性禁用css控制
    css: false,
    beforeEnter: function (el) {
        el.textContent = 'beforeEnter'
    },
    enter: function (el, done) {
        $(el).animate({}, 100, done);
    }
});
```

#### transition方法
```js
//自定义class名
Vue.transition('bounce', {
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight'
})
//监听指定过渡类型的事件
Vue.transition('bounce', {
  // 该过渡效果将只侦听 `animationend` 事件
  type: 'animation'
})
//渐近, v-for的每一级会依次执行动画
stagger: function (index) {
    // 每个过渡项目增加 50ms 延时
    // 但是最大延时限制为 300ms
    return Math.min(300, index * 50)
}
```

### 八.组件
主要分为以下三步：  
+ `Vue.extend({})` 创建组件构造器  
+ `Vue.component(tag, constructor)` 注册组件，传入构造器和自定义标签名  
+ 使用自定义标签 `<my-tag>`  

直接使用`Vue.component(tag, {})` 也是可以的，会背后滴啊用`Vue.extend()`  

#### 局部注册  
```js
var Child = Vue.extend({ /* ... */ });
var Parent = Vue.extend({
  template: '...',
  components: {
    // <my-component> 只能用在父组件模板内
    'my-component': Child
  }
});
```

#### data和el属性不宜直接使用Vue.extend
```js
var MyComponent = Vue.extend({
  data: function () {
    return { a: 1 }
  }
})
```

#### is 特性
不支持自定义元素的某些情况下使用
```html
<table>
  <tr is="my-component"></tr>
</table>
```

#### props子组件属性
```js
Vue.component('child', {
  // 声明 props
  props: ['msg', 'myMsg'],
  // prop 可以用在模板内
  // 可以用 `this.msg` 设置
  template: '<span>{{ msg }}</span>'
});
<child my-msg="hello!" msg="xxx"></child>
```
props的验证语法  
```js
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 必需且是字符串
    propB: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propC: {
      type: Number,
      default: 100
    },
    // 对象/数组的默认值应当由一个函数返回
    propD: {
      type: Object,
      default: function () {
        return { msg: 'hello' }
      }
    },
    // 指定这个 prop 为双向绑定
    // 如果绑定类型不对将抛出一条警告
    propE: {
      twoWay: true
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    },
    // 转换函数（1.0.12 新增）
    // 在设置值之前转换值
    propG: {
      coerce: function (val) {
        return val + '' // 将值转换为字符串
      }
    },
    propH: {
      coerce: function (val) {
        return JSON.parse(val) // 将 JSON 字符串转换为对象
      }
    }
  }
})
```

#### 通信 - 自定义事件  
+ `$on()` 监听  
+ `$emit()` 触发事件
+ `$dispatch()` 派发事件，事件沿着父链冒泡  
+ `$broadcast()` 广播事件，传递给后代
+ 冒泡时触发回调会停止冒泡，除非返回true  
```js
Vue.component('child', {
  template: '#child-template',
  data: function () {
    return { msg: 'hello' }
  },
  methods: {
    notify: function () {
      if (this.msg.trim()) {
        this.$dispatch('child-msg', this.msg)
      }
    }
  }
});
var parent = new Vue({
  // 在创建实例时 `events` 选项简单地调用 `$on`
  events: {
    'child-msg': function (msg) {}
  }
});

//或则在模板上使用v-on绑定
<child v-on:child-msg="notify"></child>
```

#### 子组件索引
```html
<div id="parent">
  <user-profile v-ref:profile></user-profile>
</div>

var parent = new Vue({ el: '#parent' })
// 访问子组件
var child = parent.$refs.profile
```

#### 内容分发组件嵌套时
```html
//parent的模板
<div>
    <slot>xxxx</slot> //使用parent时其包裹的部分放于此处，如果没有就替换为xxxx
    <child></child>
</div>
```

### 九.自定义
#### 自定义指令
```js
Vue.directive('my-directive', {
  bind: function () {
    // 准备工作
    // 例如，添加事件处理器或只需要运行一次的高耗任务
  },
  update: function (newValue, oldValue) {
    // 值更新时的工作
    // 也会以初始值为参数调用一次
  },
  unbind: function () {
    // 清理工作
    // 例如，删除 bind() 添加的事件监听器
  }
});
//使用
<div v-my-directive="someValue"></div>

//或者只定义update
Vue.directive('my-directive', function (value) {
  // 这个函数用作 update()
})
```
标签指令
```js
Vue.elementDirective('my-directive', {
  // API 同普通指令
  bind: function () {
    // 操作 this.el...
  }
});
<my-directive></my-directive>
```

#### 自定义过滤器
```js
Vue.filter('reverse', function (value) {
  return value.split('').reverse().join('')
});
<span v-text="message | reverse"></span>
//传递参数
<span v-text="message | wrap 'before' 'after'"></span>
function (value, begin, end) {}
```
双向过滤  
```js
Vue.filter('currencyDisplay', {
  // model -> view
  // 在更新 `<input>` 元素之前格式化值
  read: function(val) {
    return '$'+val.toFixed(2)
  },
  // view -> model
  // 在写回数据之前格式化值
  write: function(val, oldVal) {
    var number = +val.replace(/[^\d.]/g, '')
    return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
  }
})
```



