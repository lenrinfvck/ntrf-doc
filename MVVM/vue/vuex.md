# vuex 笔记
> [官方文档](https://vuex.vuejs.org/zh-cn/intro.html)  

## 1. hello vuex
```js
// 定义vuex存储空间
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

// 初始话app时注入store
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
});

// 在组件中使用store
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  method: {
      increment() {
          this.$store.commit('increment');
      }
  }
}
```

## 2. State - mapState
多个vuex到计算属性的简化写法，会自动注入state参数，或者直接使用字符串方式。    

```js
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

// 名称一致时
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

## 3. Getter
vuex中的计算属性，getter类方法  

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    // getters可以访问其他getter属性
    doneTodos: (state, getters) => {
      return state.todos.filter(todo => todo.done)
    }
  }
});
// 使用时
store.getters.doneTodos
```

范围值为函数的操作

```js
getters: {
  // ...
  getTodoById: (state, getters) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

store.getters.getTodoById(2);
```
  
## 4. Mutation
类似与事件机制，当commit触发对应行为调用回调  

```js
mutations: {
  increment (state) {
    state.count++
  }
}

store.commit('increment')
```

### 4.1 Mutation - Payload
即传参，类似trigger一个事件时传参  
```js
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10);

//方法2 commit一个对象是，会把该对象座位payload载荷
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}

store.commit({
  type: 'increment',
  amount: 10
});
```

### 4.1 Mutation - mapMutation
将mutation映射为组件方法  
```js
methods: {
  ...mapMutations([
    'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

    // `mapMutations` 也支持载荷：
    'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
  ]),
  ...mapMutations({
    add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
  })
}
```

## 5. Action - 异步事务
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    // context等同于store
    increment (context) {
      setTimeout(() => {
        context.commit('increment');
      }, 1000);
    }
  }
});

// 使用
store.dispatch('increment');
```

### 5.1 Action - mapActions
```js
methods: {
  ...mapActions([
    'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

    // `mapActions` 也支持载荷：
    'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
  ]),
  ...mapActions({
    add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
  })
}
```

## 6. Module
vuex的模块拆分方案  

```js
const moduleA = {
  state: { ... },
  mutations: { ... }
}

const moduleB = {...}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
});

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 6.1 rootState
```js
// actions的根state为context.rootState
actions: {
  incrementIfOddOnRootSum ({ state, commit, rootState, rootGetter }) {
    if ((state.count + rootState.count) % 2 === 1) {
      commit('increment')
    }
  }
}
// getters的根state为第三参数
getters: {
  sumWithRootCount (state, getters, rootState, rootGetter) {
    return state.count + rootState.count
  }
}
```

### 6.2 namespaced - 命名空间
```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
    },
    // 嵌套模块
    modules: {
      // 继承父模块的命名空间
      myPage: {
        state: { ... },
        getters: {
          profile () { ... } // -> getters['account/profile']
        }
      },
      // 进一步嵌套命名空间
      posts: {
        namespaced: true,
        state: { ... },
        getters: {
          popular () { ... } // -> getters['account/posts/popular']
        }
      }
    }
  }
});
```

### 6.3 mapXXXX在简写
```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo',
    'bar'
  ])
}

// 这样也可以生成固定命名空间下的mapXXX
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module');
```

### 6.4 registerModule - 动态注册模块
```js
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```