#swig相关使用
swig是一个类twig的模板引擎，node可用相应插件渲染，也可结合`swig.js`作为前端模板，或则结合gulp预编译为html。  

本文主要针对在gulp预编译时的简单使用，即各种标签和语法介绍。

>node：`$npm install swig --save`(node中有扩展模块提供如split等额外过滤器)  
>gulp: `$npm install gulp-swig --save-dev`  
>前端: `swig.js`

##一、初始化
以下为默认配置  
```js
    swig.init({
        //将所有模板解析和编译错误直接输出到模板。
        allowErrors: false,
        //true: HTML安全转义; false: 不转义，除非使用转义过滤器或者转义标签
        //'js': js安全转义 
        autoescape: true,
        //缓存,如果是调试预编译阶段需要设为false
        cache: true,
        encoding: 'utf8',
        //自定义过滤器
        filters: {},
        //node渲染swig时相对路径的凭依，绝对路径无视
        root: '/',
        //自定义标签，标记
        tags: {},
        //添加第三方库
        extensions: {},
        //时区默认值，影响date过滤器
        tzOffset: 0
    });
```

##二、基础
#####[变量]
######1. 普通方式

```js
    {{ foo.bar }}
    {{ foo['bar'] }}
    {{ foo['bar-lv2'] }} //不要使用foo.bar-lv2这种形式, '-'解析会出错
```

######2. Filters - 过滤器 
变量可通过过滤器处理  

```js
    {{ name|{{ name|title }} was born on {{ birthday|date('F jS, Y') }}
```

######3. Functions - 函数
这种方式function是js中的，在node中渲染时可加入模板中，不会自动转义过滤。而且并不是swig支持set一个js函数变量。

```js
    {{ mystuff()|escape }}
```

#####[逻辑标签]

使用不同于变量的`{{ }}`，逻辑标签用`{% %}`包裹，如

```js
    {% if foo %}<p>foo is true</p>{% endif %}
    {% for item in prolist %}{% endfor %}
    {% block %}{% endblock %}
```

#####[注释]

```js
    {# 注释 #}  
```

#####[空白]
去除逻辑标签前后空白`-`

```js
    {% for item in seq -%}
        {{ item }}
    {%- endfor %}
```

#####[在express中使用]

[http://paularmstrong.github.io/swig/docs/#express](http://paularmstrong.github.io/swig/docs/#express)  

##三、过滤器(*为不常用)
在变量后添加`|`符号链接过滤器对数据进行处理，可连缀书写：

```js
    // names = ['<p>paul</p>', '<p>jim</p>'];
    {{ names|striptags|join(', ')|title }}
    // => Paul, Jim
```

######[date(format, offset, abbr)]
参数 | 类型 | 含义
--- | --- | ---
format | string | 日期格式，按`PHP-style`，如"Y-m-d"、"m-d-Y"
offset | number | 时区
abbr   | string | 迷之时区控制

```js
    // now = new Date();
    {{ now|date('Y-m-d') }}
    // => 2013-08-14
```

######[default(def)]
默认值，当值为`undefined`, `null`, `false`时以参数def来替换  

```js
    {{ null_value|default('Tacos') }}
    // => Tacos
```

######[escape(type) / 简写e(type)]
字符串安全转义，默认为`e('html')`, 能把`< >`等符号转义成`&lt; &gt;`

```js
    {{ "<blah>"|escape }}
    // => <blah> #实际是&lt; &gt;
    {{ "<blah>"|e("js") }}
    // => \u003Cblah\u003E
```

######[first]
获取Array或String的第一个数据或字符

```js
    // my_arr = ['a', 'b', 'c']
    {{ my_arr|first }}
    // => a
```

######[groupBy(key)]
在一组类表格的数组中(如sql数据库的表),按key值分组并排序。

```js
    例: [{key: 1}, {key: 2}, {key: 2}]  //按key分组
    =>  {'1': [{key:1}], '2': [{key:2}, {key:2}]}


    // people = [{ age: 23, name: 'Paul' }, { age: 26, name: 'Jane' }, { age: 23, name: 'Jim' }];
    {% for agegroup in people|groupBy('age') %}
        //loop.key - 循环到当前分组时的key值
        <h2>{{ loop.key }}</h2>
        <ul>
        {% for person in agegroup %}
        <li>{{ person.name }}</li>
        {% endfor %}
        </ul>
    {% endfor %}
```

######[join(glue)]
类似js数组操作的join，用glue参数把数组或对象连接成字符串

```js 
    // my_key_object = { a: 'foo', b: 'bar', c: 'baz' }
    {{ my_key_object|join(' and ') }}
    // => foo and bar and baz
```

######[json(indent)]
把js对象等不严格的json格式转为严格的json格式字符串。`indent`设置后json会按指定数量的空格缩进

```js
    // val = { a: 'b' }
    {{ val|json }}
    // => {"a":"b"}
```

######[last]
类比first，这个取最后一位

######[lower]
变low(雾), 转换为小写

```js
    {% set people = [
        { A: 'FOO', b: 'BAR' }
    ]%}
    {{ people|lower|json }}
    // => [{"A":"foo","b":"bar"}]   #可用于字符串，数组和对象的字符串值
```

######[replace(search, replacement, flags)]
替换字符串, flags同正则'g'(全部匹配)、'i'(区别大小写)、'm'(多行)

```js
    // my_var = 'foobar';
    {{ my_var|replace('o', 'e', 'g') }}
    // => feebar
      
    // my_var = 'a1b2c3';
    {{ my_var|replace('\w', '0', 'g') }}  //支持正则
    // => 010203
```

######[reverse]
执行sort排序后，反序输出，效果等同于`{{ input|sort(true) }}`

```js
    // val = [1, 2, 3];
    {{ val|reverse }}
    // => 3,2,1
```

######[sort(reverse)]
排序，默认从小到大，reverse为true会反向  

```js
    // val = 'zaq';
    {{ val|sort }}
    // => aqz  
    
    // val = { bar: 1, foo: 2 }
    {{ val|sort(true) }}
    // => foo,bar 
``` 

######[striptags]
去除HTML标签  

```js
    // stuff = '<p>foobar</p>';
    {{ stuff|striptags }}
    // => foobar
```

######[uniq]
数组去重  

```js
    // my_arr = [1, 2, 3, 4, 4, 3, 2, 1];
    {{ my_arr|uniq|join(',') }}
    // => 1,2,3,4
```

######[upper]
字母大写转换, 类比lower  

######[url_encode]
url编码

```js
    // my_str = 'param=1&anotherParam=2';
    {{ my_str|url_encode }}
    // => param%3D1%26anotherParam%3D2
```

######[url_decode]
url解码

######[addslashes*]
反编译特殊符号转义符`\`  

```js
    {{ "\"quoted string\""|addslashes }}
    // => \"quoted string\"     #官网结果,gulp-swig会报错
    {{'\"quoted string\"'|addslashes}}
    // => \\\"quoted string\\\" #gulp-swig实测
```

######[capitalize*]
大写首字母

```js
    {{ "i like Burritos"|capitalize }}
    // => I like burritos
```

######[raw*]
未知，似乎是安全转义[原文：Deprecated in favor of safe.]

######[safe*]
安全转义，自动的escaped

######[title*]
将字符串转义为title格式，如果是数组先join拼接；title格式为单词首字母大写，其余小写。

```js
    // my_arr = ['hi', 'this', 'is', 'an', 'array'];
    {{ my_arr|title|join(' ') }}
    // => Hi This Is An Array
```

######[自定义过滤]
在初始化时可添加自定义(node中的swig模块有setFilter方法添加)  

gulp-swig中待了解...



##四、标签
######[set]
申明和赋值变量，赋值时可加入filter筛选器

```js
    // index = 2;
    {% set bar = 1 %}
    {% set bar += index|default(4) %}
    // => 3
```

######[if]
条件选择如下，可结合使用elseif, else等标签  
其中逻辑用`and`, `or`链接(类似&&, ||)  
`is not defined`, `is null`, `is sameas(false)`等特殊判断

```js
    {% if x == '1' %}
        x is 1
    {% elseif x == '2' %}
        x is 2
    {% else %}
        x is ..
    {% endif %}
```


######[for]
**循坏时的参数**
- `loop.index`  循环的次数（从1开始）
- `loop.index0`  循环的次数（从0开始）
- `loop.revindex`  循环剩余次数（最小值为1）
- `loop.revindex0`  循环剩余次数（最小值为0）
- `loop.first`  当第一次循环的时候返回true
- `loop.last`  当最后一次循环的时候返回true
- `loop.length`  循环的总数
- `loop.key`  如果为对象时，可返回当前循环的key
- `loop.parent`  被循环的数组 (官网未记录，原twig属性未测试swig)

```js
    //写法1，用于数组和对象
    {% for x in obj %}
        {{ x }}
    {% endfor %}
    //写法2，用于对象
    {% for key, val in arr|reverse %}
        {{ key }} -- {{ val }}
    {% endfor %}
```

######[include]
引入一个模板片段，渲染时变量参考当前模板下的全局变量  

`    {% include "./partial.html" %}`
with后可跟context(填充模板用的json数据或对象),表示使用指定数据渲染:

```js
    {% include "./partial.html" with context only %}
    //添加only后不会去取用其他父级的变量。但是子模板的变量有最高优先级
```
添加ignore missing可以让未找到相应文件时不报错，只输出空字符串:  

```js
    {% include "/this/file/does/not/exist" ignore missing %}
```

######[macro]
创建一个可在该模板文件下复用的代码块，类似less的mixin，如果使用import可以引入其他文件的macro

```js
    {% macro input(type, name, id, label, value, error) %}
      <label for="{{ name }}">{{ label }}</label>
      <input type="{{ type }}" name="{{ name }}" id="{{ id }}" value="{{ value }}"{% if error %} class="error"{% endif %}>
    {% endmacro %}
    
    {{ input("text", "fname", "fname", "First Name", fname.value, fname.errors) }}
    // => <label for="fname">First Name</label>
    //    <input type="text" name="fname" id="fname" value="">
```

######[import]
用于引入外部文件的macro，as后设定引入文件的别名，方便调用

```js
    {% import './formmacros.html' as forms %}
    {{ form.input("text", "name") }}
    // => <input type="text" name="name">
```

######[extend + block + parent]
标签 | 含义
--- | ---
extend | 继承一个父模板，注意必须写在文件顶部
block  | 父模板中的锚点，方便子模板重写独立内容
parent | 将父模板中同名块注入当前块中

```js
>layout.html  

    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>{% block title %}My Site{% endblock %}</title>
    
        {% block head %}
            <link rel="stylesheet" href="main.css">
        {% endblock %}
    </head>
    <body>
        {% block content %}{% endblock %}
    </body>
    </html>

>index.html  

    {% extends 'layout.html' %}
    //在继承的子模板中写block可以重写父级的block中得内容
    {% block title %}My Page{% endblock %}
    
    {% block head %}
    //这样引入parent就可以把父级的head中得内容引入，而不是全部重写
    {% parent %}
        <link rel="stylesheet" href="custom.css">
    {% endblock %}
    
    {% block content %}
        <p>This is just an awesome page.</p>
    {% endblock %}
```

######[raw]
禁用编译，原样输出
```js
    // foobar = '<p>'
    {% raw %}{{ foobar }}{% endraw %}
    // => {{ foobar }}
```

######[filter]
管道方式的过滤器的标签形式
```js
    {% filter replace(".", "!", "g") %}Hi. My name is Paul.{% endfilter %}
    // => Hi! My name is Paul!
```

######[spaceless*]
去除标签间的空白

```js 
    {% spaceless %}
      {% for num in foo %}
      <li>{{ loop.index }}</li>
      {% endfor %}
    {% endspaceless %}
    // => <li>1</li><li>2</li><li>3</li>
```

######[autoescape*]

```js
    //关闭自动转义
    {% autoescape false %}
        {{ some_html_output }}
    {% endautoescape %}
    //开启自动转义
    {% autoescape true %}
        {{ some_html_output }}
    {% endautoescape %}
    //设置按js方式转义,同e('js')
    {% autoescape true "js" %}
        {{ some_html_output }}
    {% endautoescape %}
```

##五、补充
###1.作为前端模板
类似Arttemplate一类的前端模板引擎的使用，引入`swig.js`即可。  

```js
    {% raw %}
    <script id="tap1" type="text/html">
        {{ val }}
    </script>
    {% endraw %}

    swig.render($("#tap1").text(), { locals: { val: 'hellow' }});
```
  

>参考链接
>官网文档: [http://paularmstrong.github.io/swig/docs/](http://paularmstrong.github.io/swig/docs/)  
>部分中文文档: [http://www.cnblogs.com/elementstorm/p/3142644.html](http://www.cnblogs.com/elementstorm/p/3142644.html)