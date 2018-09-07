# Angular运行原理

Angular实例对象  
+ .injector()  
+ .module  

## 启动方式
1. angualr加载完成后，自动扫描dom，找到ng-app根据controller启动。  
2. 手动启动的话类似下面:  

```js
angular.element(document).ready(function() {
    angular.bootstrap(document, ['MyModule']);
})
```

## 注入方式
内链注入  
```js
myModule.controller('ctrl', ['$scope', function($scope) {
    console.log($scope);
}]);
```

推断注入 - angular会根据期望的参数名去查询对应的可注入模块
```js
myModule.controller('ctrl', function($scope) {})
```

注射器注入  
```js
MyCtrl = function(scope) {};
MyCtrl.$inject = ['$scope'];
myModule.controller('ctrl', MyCtrl);
```


