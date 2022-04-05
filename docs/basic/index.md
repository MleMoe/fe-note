---
sidebar: auto
---

# 关于证明我是一名 JS 程序员这件事（面试版）

## 浏览器

浏览器是前端开发的主要运行环境。
主要功能为向服务器请求资源，并在窗口中展示，资源一般指 HTML 文档，或 PDF、图片及其它格式。

如下图，浏览器的主要组件包括：

- 用户界面（User Interface），页面内容外的部分，包括地址栏、后退/前进按钮、书签目录等；
- 浏览器引擎（Browser engine），用来查询及操作渲染引擎的接口；
- **渲染引擎**（Rendering engine）：解析请求内容与显示页面；
- 网络（Networking）：用于网络调用；
- 用户界面后端（UI Backend）：浏览器的基本图形库，底层使用操作系统接口；
- **JS 解释器**(JavaScript interpreter) ：解释执行 JS 代码；
- 数据持久化（Data Persistence）：Cookie、Local Storage 等数据存储机制。

<div align="center">
  <img src="/images/basic/browser-structure.png" width=600 />
</div>

### 输入 url 到页面呈现

- 将 url 解析成 ip 地址，先查找缓存，没有则进行 dns 解析，向域名服务器处获取 ip
- 建立 tcp 连接
- 若是 https 则有一个 ssl 验证的过程
- 发送 http 请求
- 收到服务器响应的资源文档
- （渲染机制）构建 dom 树和 cssom 树，布局，再渲染
- 画面呈现

### 渲染机制

浏览器的渲染引擎负责解析和显示请求的内容。

> 常见的渲染引擎有：Webkit（Chrome、safari）、Trident（IE）、Gecko（Firefox）。移动端通常是 Webkit 或 Blink 内核，此两者对新特性的支持度较高。其中 Blink 基于 Webkit2 创建，Android 的 WebView 同样基于 Webkit2。

渲染引擎主要工作是以 HTML/JavaScript/CSS 等文件作为输入，以可视化内容作为输出。关键渲染路径如下：

- 解析 HTML 构造 **DOM 树**
- 解析 CSS 构造 **CSSOM 树**
- 两者合并生成**渲染树**；
- 布局
- 绘制

<div align="center">
  <img src="/images/basic/render-flow.png" width=660 />
</div>

### 重排与重绘

- 回流/重排（reflow）：页面上某些元素的占位面积、定位方式、边距等属性的变化，影响了布局，需要倒回去重新渲染。
- 重绘（repaint）：某个元素的背景色、文字颜色、边框颜色等等改变，不影响其周围或内部布局的属性时，页面部分需重画。

> 注意：回流一定会触发重绘，而重绘不一定会。重绘的开销较小，回流的代价较高

### JS 引擎

JS 引擎用于解析和执行 JavaScript 代码，chrome 的 JS 解释器是 C++编写的 V8，JS 在 v8 引擎中的执行过程如下图：

<div align="center">
  <img src="/images/wasm/v8-js.png" width=600 />
</div>

JavaScript 的解析过程简单来说就是：源码 --> AST --> 字节码 --> 二进制代码

- 解析器 Parser 把 JS 代码转化成抽象语法树 AST
- 解释器 Ignition 将 AST 转化成字节码 ByteCode
- 执行字节码及优化

解释执行字节码时，标记重复执行的热点代码，将之发送给编译器 TurboFan，编译为更高效的机器码并储存起来。下次执行该段代码时，用机器码替代执行。
另外，当编译器判断一段代码不再为热点代码的时候，会把优化的机器码丢掉，然后继续由解释器执行。

<div align="center">
  <img src="/images/wasm/optimization.png" width=600 />
</div>

> 但由于 JavaScript 为动态类型语言，变量上一秒可能是 Array，下一秒就变成了 Number。那么上一次引擎所做的优化，就失去了作用，需重新优化。这是 TypeScript 出现的背景之一。

### 浏览器加载顺序

常规网页加载流程如下：

1. 浏览器一边下载 HTML 网页，一边开始解析；
2. 解析过程中，发现 `<script>` 标签，暂停解析，网页渲染的控制权转交给 JS 引擎；
3. 如果 `<script>` 标签引用了外部脚本，就下载该脚本，否则就直接执行；
4. 执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。

> JS 的加载和执行会造成阻塞。
> 因为浏览器渲染和 JS 执行共用一个线程，而且这里必须是单线程操作，多线程会产生渲染 DOM 冲突。
> html 需要等 head 中所有的 js 和 css 加载完成后才会开始绘制，但是 html 不需要等待放在 body 最后的 js 下载执行就会开始绘。
> 因此 script 的位置很重要，需遵循以下两个原则：CSS 优先和 JS 置后（`<body>`内底部），且 JS 应尽量少影响 DOM 的构建

`<script>` 标签内可使用 `async` 和 `defer` 缓解阻塞，如图：

<div align="center">
  <img src="/images/basic/script-execution.png" />
</div>

从上图可知：

- `defer` 和 `async` 在网络加载过程中都是异步执行；
- 两者的区别在于脚本加载完成之后何时执行。

> 如果存在多个有 `defer` 属性的脚本，按照加载顺序执行；
>
> `async` 无论声明顺序如何，只要加载完成就立刻执行，完全不考虑依赖关系。
>
> 在实际应用中，`defer` 是**更适合的**缓解阻塞的方案。

### 跨域

前置概念：

- 源（origin）：协议（protocol）、域（domain）、端口（port）的组合
- 浏览器的同源策略：不同源的网站无法访问对方内容
  > 在浏览器中，`<script>`、`<link>`、`<img>`、`<iframe>`等标签可加载跨域资源，不受同源策略限制。
  > 但是通过 src 加载的资源，会限制 JS 权限，不能对源文件本身进行读写。

常用方法如下：

#### 1. `window.postMessage` 属性和 `message` 事件

用于跨域**跨窗口**消息传递，可用于解决以下方面的问题：

- 页面和其打开的新窗口的数据传递
- 页面与嵌套的 iframe 消息传递
- 多窗口之间消息传递、
- 上面三个问题的跨域数据传递

其工作方式如下：

- 当前窗口 发送消息

  - otherWindow 为目标窗口的一个引用。比如 iframe 的 contentWindow 属性、执行 window.open 返回的窗口对象、或者是 window.frames
  - message 序列化的待发送消息
  - targetOrigin 目标域

```js
otherWindow.postMessage(message, targetOrigin, [transfer])
```

- 目标窗口 接收消息

如果指定的源匹配的话，那么当调用 `postMessage()` 方法的时候，目标窗口的 Window 对象会触发一个 `message` 事件

```js
// 为 window 添加 message 事件监听获取消息
window.addEventListener(
  'message',
  function(e) {
    var origin = event.origin
    // 通常，onmessage()事件处理程序应当首先检测其中的origin属性，忽略来自未知源的消息
    if (origin !== 'http://example.org:8080') return
    // ...
  },
  false
)
```

#### 2. CORS：跨源资源共享（Cross-Origin Resource Sharing）

参考：[跨源请求](https://zh.javascript.info/fetch-crossorigin)

#### 3. 服务器代理

启一个代理服务器，实现数据的转发。常用 nginx 服务器

#### 4. script 脚本 + JSONP (JSON with padding)

原因：使用 script 标签， script 可以执行任何域的 src 文件。
假设网站需要以这种方式从 `http://another.com` 网站获取数据，需要后端配合。流程如下：

- 先声明一个**全局函数**来**接收数据**，例如 gotWeather

  ```javascript
  function gotWeather({ temperature, humidity }) {
    alert(`temperature: ${temperature}, humidity: ${humidity}`)
  }
  ```

- 然后创建一个`<script>`标签，将上述函数名作为 `src` 属性 `URL` 的 callback 参数

  ```js
  let script = document.createElement('script')
  script.src = `http://another.com/weather.json?callback=gotWeather`
  document.body.append(script)
  ```

- 远程服务器 `another.com` 动态生成一个脚本，该脚本内容为：调用 `gotWeather` 函数，并将数据作为参数传入，由此获得数据

  ```js
  gotWeather({
    temperature: 25,
    humidity: 78,
  })
  ```

### 浏览器事件循环

### 浏览器垃圾回收机制

### 如何定位内存泄露

## ECMAScript 基础

### 前端模块化规范

### TypeScript

### New 操作符原理

### 闭包

### 继承

### 异步编程

## 样式

### BFC 的形成和作用

### 移动端自适应的方式

### CSS 预处理器

### CSS 后处理器

## 网络

### 前端安全问题

### HTTP

#### HTTPS

#### 缓存机制

#### HTTP 1.0、2.0

## 编程

### 手写 Promise

### 节流防抖

### 列表 -> 树

## 前端工程化

### Webpack

### Babel

### Grunt

### Glup

### Roolup

### esbuild

### vite

## 框架

### vue

### react
