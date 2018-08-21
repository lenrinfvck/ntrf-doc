# TypeScript摘要
### 1.基础类型
定义变量参数时`:number`，`:Array<number>`以注解参数类型  

#### 1.1 基本类型 
`boolean`, `number`, `string`
#### 1.2 数组 
`number[]`, `Array<number>`  
#### 1.3 元组[Tuple] 
`[string, number]` 此情况赋值时必须满足格式，添加新元素时必须为其中类型之一  
#### 1.4 枚举[enum] 

```ts
    enum Color {Red = 1, Green = 2, Blue = 4}
    let c: Color = Color.Green;
    let colorName: string = Color[2];
    // to js =====================>
    var Color;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Blue"] = 4] = "Blue";
    })(Color || (Color = {}));
    var c = Color.Green;
    var colorName = Color[2];
```
#### 1.5 Any
类型检测将无视any类型，即使可能不存在相应方法 `obj: { [key: string]: any}`  

#### 1.6 Void
void 类型只能赋值 `undefined`, `null`  

#### 1.7 Null和Undefined
null和undefined默认可以赋值给其他类型，开启`--strictNullChecks`后只能赋值给void和自身

#### 1.8 Never
不存在的值类型，如函数`throw new Error()`等会中断函数执行无法走到终点  

#### 1.9 类型断言
当使用的是any类数据时，ts时将无法检测，这是可以强制设定该值的类型  

```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length; //jsx只支持此写法
```

### 2. 接口
