# Electron入门
### 1.hello world
#####package.json
```json
{
  "name": "electron_hello",
  "version": "0.1.0",
  "main": "./main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron-prebuilt": "^0.30.3"
  }
}
//如上配置后再目录npm start即可启动应用 
```

##### main.js
```js
var app = require('app');
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,   //是否有系统窗口
        height: 700,
        width: 368,     
        resizable: false //窗口大小拖动
    });
    //视图模板
    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});
```

##### index.css
```css
html,
body {
    //简单的设置能否拖动窗口
    -webkit-app-region: drag;
}
.btn {
    -webkit-app-region: no-drag;
}
```

### 2.基本模块
#### 2.1 ipc模块 - 消息订阅与发送
类似绑定事件
```js
var ipc = require('ipc');
//订阅
ipc.on('close-main-window', function () {
    app.quit();
});
//发送
closeEl.addEventListener('click', function () {
    ipc.send('close-main-window');
});
```

#### 2.2 global-shortcut模块 - 快捷键管理
```js
var globalShortcut = require('global-shortcut');
//window的话使用ctrl亦可
globalShortcut.register('cmd+shift+1', function() {
    //向打开的窗口中传递相应消息及参数
    mainWindow.webContents.send('global-shortcut', 0);
});
//之后在页面js中可用ipc监听
ipc.on('global-shortcut', function(arg) {
    var event = new MouseEvent('click');
    soundButtons[arg].dispatchEvent(event);
});
```

#### 2.3 browser-window模块 - 窗口
```js
settingsWindow = new BrowserWindow({
    frame: false,
    height: 200,
    resizable: false,
    width: 200
});
//加载视图并打开,在视图html中可添加相应的js和css
settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');
//关闭
settingsWindow.close()
```

#### 2.4 conf模块 - 存储读取json配置
此为外部模块，需要安装`npm install --save conf`
```js
'use strict';

var nconf = require('nconf').file({file: __dirname + '/sound-machine-config.json'});

function saveSettings(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
}

function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings
};
```

#### 2.5 remote模块 - 另一种通信手段
尝试在系统托盘添加应用图标
```js
var remote = require('remote');
//系统托盘图标
var Tray = remote.require('tray');
//创建菜单用
var Menu = remote.require('menu');
var path = require('path');

var trayIcon = null;

if (process.platform === 'darwin') {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
}
else {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}
var trayMenuTemplate = [
    {
        label: 'Sound machine',
        enabled: false
    },
    {
        label: 'Settings',
        click: function () {
            ipc.send('open-settings-window');
        }
    },
    {
        label: 'Quit',
        click: function () {
            ipc.send('close-main-window');
        }
    }
];
var trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
//在图标上挂载创建的菜单
trayIcon.setContextMenu(trayMenu);
```

### 3.打包
```shell
electron-packager <location of project> <name of project> <platform> <architecture> <electron version> <optional options>
```
+ location of project是你项目文件夹的位置，  
+ name of project定义你的项目名，  
+ platform决定要构建的平台（*all* 包括Windows，Mac和Linux ），  
+ architecture决定构建哪个构架下（x86或x64，all表示两者），  
+ electron version让你选择要用的Electron版本  

```bash
#案例
electron-packager ~/Projects/sound-machine SoundMachine --all --version=0.30.2 --out=~/Desktop --overwrite --icon=~/Projects/sound-machine/app/img/app-icon.icns
```














