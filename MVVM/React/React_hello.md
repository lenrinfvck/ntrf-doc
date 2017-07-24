# React入门
>参考链接: [阮一峰-React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)

### 1.hello world
```html
<!DOCTYPE html>
<html>
  <head>
    <!-- react核心库 -->
    <script src="../build/react.js"></script>
    <!-- react与dom相关功能 -->
    <script src="../build/react-dom.js"></script>
    <!-- 测试用后编译 -->
    <script src="../build/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <!-- jsx脚本，需要编译 -->
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

#### ReactDOM.render(jsx, dom)
传入jsx模板和需要插入到的dom对象。

### 2.jsx语法
`<xx></xx>`标签包裹的按html解析，`{}`包裹的按js解析，可以互相嵌套

### 3.组件
使用`React.createClass`创建:  

```html
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```

如上，  
1. `React.createClass` 申明组件类，必须要配置render方法，变量名需大写。与ng类似，组件顶层只能有一个标签。    
2. `<HelloMessage />` 使用时创建了相应实例。  
3. `this.props` 可以获取标签上的属性。  
4. this可以当做原生dom使用，需要注意class、for等标签属性使用的是className、htmlFor。  

#### this.props.children
非标签属性，表示该组件的所有子节点
```html
//如下两个<span>即是NotesList的children
ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```
+ 没有子节点时，为`undefined`  
+ 有一个节点时，object  
+ 多个节点时，array  
可以使用`React.Children.map(this.props.children, fn(child))`来遍历children属性。  

#### PropTypes - 属性验证 
用于验证组件标签属性:
```html
var MyTitle = React.createClass({
  propTypes: {
    //必填字符串
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
```

#### getDefaultProps - 属性默认值
```js
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  }
});
```

#### this.refs - 获取实际DOM对象
```html
handleClick: function() {
    //获取到真实DOM
    this.refs.myTextInput.focus();
},
render: function() {
    return (
        <div>
            <input type="text" ref="myTextInput" />
            <input type="button" value="Focus the text input" onClick={this.handleClick} />
        </div>
    );
}
```

#### this.state - 组件状态
通过`getInitialSate`初始化状态值，`this.setState`可修改  
```js
getInitialState: function() {
    return {liked: false};
},
handleClick: function(event) {
    this.setState({liked: !this.state.liked});
},
render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    ...
}
```
每次调用`this.setState`后会自动调用一次`render`  
如此，可以通过state实现表单的双向绑定  

#### 回调
组件生命周期  
+ `componentWillMount/componentDidMount` 插入真实DOM  
+ `componentWillUpdate/componentDidUpdate` 正在被重新渲染  
+ `componentWillUnmount` 移除真实DOM  
其他  
+ `componentWillReceiveProps` 已加载组件收到新参数时
+ `shouldComponentUpdate` 判断是否重新渲染时  






