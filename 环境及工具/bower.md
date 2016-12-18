# bower使用笔记
## 安装
`npm install -g bower`

## 使用
### 初始化
`bower init`  
一路回车后会生成 **bower.json** 文件，类似package.json  

### 配置模块目录
穿件 **.bowerrc** 文件：  

```json
{
    "directory": "js/lib"
}
```

### 相关操作
```js
//安装jquery
bower install jquery --save
//查询bower支持的版本信息
bower info jquery
//插叙关键字对应的模块名
bower search jquer
//卸载模块
bower uninstall jquery
//修改配置文件中模块版本号后进行更新
bower update
```