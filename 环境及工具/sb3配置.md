#Sublime Text3 相关配置
###1.全局个人配置[Setting-User] `Preferences.sublime-settings`
```json
    {
        //代码字体大小
        "font_size": 13,
        //Mac上，打开单个文件以tab形式打开
        "open_files_in_new_window": false,
        //右下角显示编码
        "show_encoding": true,
        //右下角显示换行符
        "show_line_endings": true,
        //缩进改为空格
        "translate_tabs_to_spaces": true
        //缩进为4个空格
        "tab_size": 4,
        //忽略文件
        "file_exclude_patterns":
        [
            ".DS_Store"
        ],
        //忽略文件夹
        "folder_exclude_patterns":
        [
            ".git",
            ".vagrant"
        ],
    }
```
###2.插件
####插件包管理器安装  

按 **Ctrl/Command + /`** 调出控制台输入  

    import urllib.request,os,hashlib; h = '5b468e895e861582c8ac080daaae7722' + 'a0787a887fb19723f006ed5b020ffdf6'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)  

回车安装，之后可使用`Ctrl/Command + shift + p`输入Install Package之后进入插件搜索，回车即选择安装

####常用插件（`Package Control.sublime-settings`为插件列表）

+   **CSS Format**  CSS格式化 
+   **Emmet**  代码补全
+   **HTML-CSS-JS Prettify**  HTML-CSS-JS格式化
+   **JsFormat**  JS格式化
+   **JSHint Gutter**  代码检错，规范书写风格 
+   **LESS**  LESS高亮
+   **Markdown Preview**  Markdown转html并调用浏览器预览  
+   **MarkdownEditing**  Markdown高亮

###3.快捷键(只列举几个特殊的)
`Ctrl/Cmd + P`  Goto Anything，直接输入为检索文件，加`:`到指定行数，`@`到指定函数
`Ctrl/cmd + shift + P` 命令窗口
`option + 鼠标拖动`(Mac) / `鼠标中键拖动`(Win) 多行选择
`option + Enter`(Mac) find时find all

###4.JSHint的使用
+   安装JSHint 
Sublime中安装插件 **JSHint Gutter**  
Node安装全局jshint `npm install -g jshint`  

+   配置jshint

Sublime：工具 > jsHint > Set Linting Preferences修改为以下  

    {
        jshintrc: true
    }

在代码根目录下创建`.jshintrc`文件，写入以下内容  

```json
{
    //声明浏览器环境
    "browser": true,
    //允许在if，for，while语句中使用赋值
    "boss": true,
    //使用if和while等结构语句时必须加上大括号来明确代码块
    "curly": true,
    //使用===或者是!==，而不是==和!=
    "eqeqeq": true,
    //允许使用"== null"作比较
    "eqnull": true,
    //允许应该出现赋值或函数调用的地方使用表达式
    "expr": true,
    //匿名函数调用，使用(function(){ ... })(); 而不是(function(){ ... }());;
    "immed": true,
    //禁止使用arguments.caller和arguments.callee
    "noarg": true,
    //函数只允许被var的形式声明一遍
    "onevar": true,
    //true表示字符串可以使用单引号和双引号，但必须保持一致，double表示必须使用双引号
    "quotmark": "double",
    //Tab与空格混用
    "smarttabs": true,
    //不允许行尾空格
    "trailing": true,
    //所有的非全局变量，在使用前都必须被声明
    "undef": true,
    //变量声明了但不使用会被警告
    "unused": true,
    //必须使用use strict;语法 
    "strict": true,
    //暴露全局jQuery和$变量，可以在任何地方随意使用
    "jquery": true,
    //允许Node环境全局成员
    "node": true
}
```

+   使用jshint  
直接在JS文件中`shift + cmd + J` / `ctrl + alt + J`即可  
