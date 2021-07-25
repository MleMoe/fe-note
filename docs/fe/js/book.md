# Professional JavaScript for Web Developer

打好基础！

## 变量声明

var 是函数作用域，所以 for () 内的 var 会渗透到循环体外部
let 是块级作用域，所以 for 使用 let，这个问题就解决了

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
// 输出为 5 5 5 5 5
// var 改成 let 会输出 0 1 2 3 4
```

因为在退出循环时，i（函数作用域内的变量） 保存的是导致循环退出的值。在之后执行微任务时，所有的 i 琐事同一个变量，所以输出的都是 5.

而使用 let 声明 i 时，js 引擎会在后台为每个迭代循环声明一个新的局部迭代变量，每个 setTimeout 引用的都是不同的变量实例。

var 在全局作用域内声明，会成为 window 对象的属性
let 在全局作用域内声明，不会成为 window 对象的属性，但是也会在页面的声明周期内存续

const 和 let 基本相同，区别就是

- 使用 const 声明变量式必须初始化变量，且后续不能修改变量。
  限制只适用于它指向的变量的引用，所以修改这个对象内部的属性并没有违反限制。

  > 前端规约：支持使用 const，就算是引用变量也是，因为引用地址不会变。

- const 不能用作常规 for 循环的迭代变量，因为会自增，但是可以用在 for(const key in object) 和 for(const value of object) 中，因为每次迭代只是创建一个新变量。

所以 var 顶级声明会成为 window 对象的属性，而 let 和 const 则不会。不过三者在作用域链解析上效果是一样的。

开发规约：

- 不使用 var
- const 有限，let 次之

## 数据类型

js 有 6 种原始类型：

```js
Undefined;
Null;
Boolean;
Number;
String;
Symbol;
```

一种复杂类型：`Object`

NaN：not a number

Undefined 类型只有一个值：undefined，当使用 var/let 声明了变量却没有赋值时，这个变量就是 undefined。

### 判断数据类型

- typeof variable;
  输出值如下：
  object; (object/null，因为 null 被认为是对一个空对象的引用)
  undefined;
  boolean;
  number;
  string;
  symbol;
  **function**; 严格来讲函数也是对象，并不代表一种数据类型，但是函数有自己特殊的属性，有必要 typeof 对它特殊
