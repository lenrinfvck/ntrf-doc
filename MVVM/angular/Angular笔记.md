# Angular学习笔记
>慕课网：《angular实战》[[教程地址]](http://www.imooc.com/learn/156)
>ng文档： [官方英文文档](https://code.angularjs.org/1.4.6/docs/api)  


### 1.模块、路由、依赖注入
#### 1.1模块书写    
```js
angular.module('todoApp', [])
    .controller('TodoListController', ["$scope", function($scope) {
        var todoList = this;
    }])
    .controller('Ctrl2', ...)
```
##### 1.1.1 模块相关方法  
+ `.run(cb)` 在该模块和相关依赖模块加载完后执行的回调  
+ `.config(cb)` 在该当前模块加载后调用  
+ `.name` 返回注册时的模块名  

#### 1.2路由
原生写法案例：  
```js
//创建模块并添加依赖，主视图的ng-app="mainApp"来指定该入口程序
var app = angular.module('mainApp', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider.when('/hello', {
        templateUrl: 'tpls/hello.html',
        controller: 'HelloCtrl'
    }).when('/list', {
        templateUrl: 'tpls/list.html',
        controller: 'listCtrl'
    }).otherwise({
        redirectTo: '/hello'
    });
});
```

ui-router
```js
var app = angular.module('mainApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/index.html'
                },
                'topbar@index': {
                    templateUrl: 'tpls/topbar.html'
                }
            }
        })
        .state('index.user', {
            url: '/user',
            views: {
                'main@index': {
                    templateUrl: 'tpls/index.html',
                    controller: function($scope, $state) {
                        $scope.addUserType = function() {
                            $state.go('index.user.addUserType');
                        }
                    }
                }
            }
        });
});
```
[ui-router view]
```html
//views里的''根对应ui-view，topbar@index等view都加入到ui-view里
<div ui-view>
    <div ui-view="topbar"></div>
</div>
```


### 2.数据绑定
#### 2.1数据单向绑定
```html
//向上控制器的$scope里取greeting.text
<p>{{greeting.text}}</p>
```
使用ng-bind绑定
```html
//相比{{}}来说，ng运行前不会显示{{greeting.text}}
<p ng-bind="greeting.text"></p>
```

#### 2.2数据双向绑定
[html视图]
```html
<form ng-controller="loginCtrl">
    <input type="text" ng-model="user.name">
    <input type="text" ng-model="user.email">
    <input type="checkbox" ng-model="user.autoLogin">
    <button ng-click="getForm"></button>
</form>
```
[controller]
```js
angular.module('UserLogin', [])
    .controller('loginCtrl', ['$scope', function($scope) {
        $scope.user = {
            name: 'xxx',
            email: '111@qq.com',
            autoLogin: false
        }
        $scope.getForm = function() {
            console.log($scope.userInfo);
        }
    }]);
```

#### 2.3利用数据绑定控制样式
[view]
```html
//直接数据绑定
<div class="bg-{{color}}"></div>
//使用ng-class绑定，其中isError为绑定的数据，为true时error样式会输出在html上
<div ng-class="{error: isError, warning: isWarning}"></div>

//ng-class详细
"{error: isError, warning: isWarning}" //逻辑判断
"style" //直接绑定
"[style1, style2, style3]" //绑定复数个值时
"[style4, {warning: isWarning}]" //混合使用
```

`ng-show` `ng-hide`绑定的数据为true时可以html标签显示嚯隐藏  

#### 2.4[ng-animate]
结合CSS3状态动画@keyframes来调用动画
[view]
```html
<div class="page {{pageClass}}" ng-view></div>
```

[controller]
```js
//contoller
$scope.pageClass="hello";
//在路由切换时，ng会自动添加ng-enter和ng-leave两个class
//如在切入“/hello”时就会有class="page hello ng-enter"
```

[css]  
```css
.ng-enter {
    z-index: 8888;
}
.ng-leave {
    z-index: 9999;
}
//
.hello {
    &.ng-enter {
        animation: fadeIn 0.5s both ease-in;
    }
    &.ng-leave {
        animation: fadeOut 0.5s both ease-in;
    }
}
```
#### 2.5 scope相关  
+ `angular.element("[ng-controller=xxx").scope()` 基于选择器方式获取  
+ `$rootScope`是ng-app顶级的作用域，或则使用`angular.bootstrap(dom/jqdom, [依赖的模块名])`方法手动加载ng时的那个DOM  


### 3.指令
#### 3.1 基本案例
```js
var myModule = angular.module("MyModule", []);
myModule.directive("hellp", function() {
    return {
        restrict: 'E', //AMEC,默认为A
        template: '<div>Hi everyone!</div>',
        //templateUrl: 'hello.html' //替代template
        replace: true, //替换原指令标签内部的内容,保留使用transclude
        transclude: true, //此时在template中加入<div ng-transclude></div>为原内容
        compile: function() {}, //编译时调用，默认覆盖默认编译，不常实用
        link: function() {}, //编译后执行，可以用来操作dom如绑定事件
    }
});

//restrict不同类型的使用
<hello></hello> //E
<div hello></div>  //A
<div class="hello"></div> //C
<!-- directive:hello --> //M,注意前后的空格
```

#### 3.2 缓存指令
```js
//run方法当模块加载完成后执行一次
myModule.run(function($templateCache) {
    $templateCache.put("hellow.html", "<div>Hello</div>");
});

myModule.dirctive("hello", function($templateCache) {
    return {
        restrict: 'AECM',
        template: $templateCache.get("hello.html"),
        replace: true
    }
});
```

#### 3.3 link属性
```js
//controller里定义$scope.loadData=function();
link: function(scope, element, attr) {
    element.bind("mouseenter", function() {
        scope.loadData();
    };)
}
```
[attr参数用法,实现指令的复用]
```js
//html
<dic ng-controller="Ctrl1">
    <loader howtoload="loadData()"><loader> 
</div>
<dic ng-controller="Ctrl2">
    <loader howtoload="loadData2()"><loader> 
</div>

//js
link: function(scope, element, attr) {
    element.bind("mouseenter", function() {
       scope.$apply(attr.howtoload);
    };)
}
```

#### 3.4 指令之间交互
```js
myModule.dirctive("superman", function($templateCache) {
    return {
        scope: {}, //指令独立的scope
        restrict: 'AE',
        template: $templateCache.get("hello.html"),
        //指令独立的controller,暴露公共方法用,此处scope就是创建的独立scope
        controller: function($scope) {
            $scope.abilities = [];
            this.addStrength = function() {
                $scope.abilities.push("strength");
            };
            this.addStrength = function() {
                $scope.abilities.push("speed");
            };
            this.addStrength = function() {
                $scope.abilities.push("light");
            };
        },
        link: function(scope, element, attrs) {
            element.addClass('btn');
            element.bind('mouseenter', function() {
                console.log(scope.abilities);
            });
        }
    }
});
myModule.dirctive("strength", function() {
    return {
        //引入其他指令,之后link可以使用第4个回调参数用于调用其他指令的方法
        require: '^superman',
        link: function(scope. element, attrs, supermanCtrl) {
            supermanCtrl.addStength();
        }
    }
});
```

#### 3.5 scope绑定策略
主要用于父级ctrl和子级的指令数据共享  
```js
scope: {
    a: '@', //内部scope的a值绑定到标签属性对应的字符串，该属性有b="{{flavor}}"
    b: '=', //双向绑定,内部scope修改能改变父级controller的scope值，书写是直接b="flavor"
    c: '&'  //绑定父scope的函数，书写是c="sayhello(name)";
    //&绑定时传递参数注意：ng-click="sayhello({name:userName})"
}
```

#### 3.6 内置指令[form]
```html
<form name="myForm" ng-submit="save()" ng-controller="TestFormModule">
    //内置多种type自动校验，如email等
    <input type="text" name="userName" ng-model="user.userName" required />
    //$invalid的属性判断校验是否通过
    <input type="submit" ng-disabled="myForm.$invalid" />
</form>
```
form的scope中会按name值创建一个`form对象`，如如上`<input name="userName">`可以由`myForm.userName`调用相关属性，其中有如下几个状态属性：  
+ `$valid` 是否通过校验，可以是某个input，也可以是整个form的  
+ `$error` 未校验通过时的错误信息，如{required: true}  

*校验属性*  
校验 | 作用
--- | ---
required/ng-required [string] | 必填,ng-required是备用，防止属性重名
ng-minlength/ng-maxlength [number] | 长度
pattern/ng-pattern [string] | 正则校验
ng-change [string] | 绑定change事件的回调
ng-trim [boolean(true)] | false时不会自动去空格 

*样式控制* 当满足条件时添加class
+ `ng-valid` 校验通过时  
+ `ng-invalid` 校验未通过  
+ `ng-pending` 待定时  
+ `ng-pristine` 未填入时  
+ `ng-dirty` 有填入操作后   
+ `ng-submitted` 提交后    

```html
<form name="myForm" ng-submit="save()" ng-controller="TestFormModule">
    <input type="text" name="userName" ng-model="user.userName" ng-pattern="/^\s*\w*\s*$/" ng-trim="false" required />
    <input type="submit" ng-disabled="myForm.$invalid" />
</form>
```

### 4.Service与Provider
#### 4.1 自定义服务
```js
myModule.factory('dataBus_user', ['$http', function($http) {
    var doRequest = function(username, path) {
        return $http({
           method: 'GET',
           url: 'users.json' 
        });
    }
    return {
        userList: function(username) {
            return doRequest(username, 'userList');
        }
    }
}]);
```

#### 4.2 $http
```js
myModule.controller('dataBus', ['$scope', '$http'], function($scope, $http){
    $http({
        method: 'GET',
        url: 'url.json'
    }).success(function(data, status, headers, config) {
        console.log('success...');
        $scope.users=data;
    }).error(fn(data));
}]);
```

#### 4.3 $watch
监听scope值得改变
```js
//注入$scope,$timeout
var timeout;
$scope.$watch('username', function(new, old) {
    if (newUserName) {
        //timeout防抖动
        if(timeout) {
            $timeout.cancel(timeout);
        }
        timeout = $timeout(function() {
            $http(...);
        }, 350);
    }
});
```

#### 4.4 $filter
```html
    <p>{{ 1304375948024 | date:"MM/dd/yyyy hh:mm:ss" }}</p>
```
名称 | 含义
--- | ---
currency:symbol:number | symbol插入前缀如`$`，货币，每3位插入`,`，如$1,234.56  
date | 日期
json:number | json缩进排版，number为tab的空格数（默认为2）  
limitTo:number | array和string时就是按length截取，number时先toString在截取
lowercase/uppercase | 小写/大写
number:number | 保留小数位数，默认3
orderBy:string:reverse | 排序，默认升序，string为参考属性，如"-age"，有-号表示降序

[自定义]
```js
myModule.filter('filter1', function() {
    retrurn function(item) {
        return item + 'xx';
    }
});
```

### 5. 高级
#### 5.1 控制器，指令之间通信  
##### 父级控制器和子控制器
+ $scope作用域继承原则，子集可以访问父级属性  
+ 子可使用`$emit(eventName, args)`传递事件，父可用`$on(eventName, cb)`来监听，会依照scope层级冒泡  
+ 父级可以使用`$broadcast(e, args)`广播给子集

##### 父级控制器和子级指令
使用指令的内部scope的绑定策略，暴露属性给父级方便绑定  

##### 通用Service
创建的service, factory, provider都是单例的，数据可共享

#### 5.2 控制器的创建原理  
`module.controller(name, fn(){})`方式注册控制器，这是一个工厂方法，当ng初始化时查看到view中的ng-controller属性时再到ng上下文中去调用注册的好的ctrl去实例化一个对应的controller对象，该对象中的scope是独立的，如此，同一个模板上的相同controller的scope是相互独立的。  


### .ERP类系统常用ui组件
+ Form
+ DatePicker
+ FileUpload
+ Tree
+ DataGrid[ng-grid]

