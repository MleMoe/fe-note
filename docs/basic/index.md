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
- 构建 dom 树和 cssom 树，布局，再渲染，合成图层再显示在屏幕上

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

#### 概念介绍

- 重绘（repaint）：外观有变化时，会导致重绘。相关的样式属性如 `color` `opacity` 等
- 回流/重排（reflow）：布局结构或节点内容变化时，会导致重排。相关的样式属性如 `height` `float` `position` 等

> 注意：重排一定会触发重绘，而重绘不一定会。重绘的开销较小，回流的代价较高
> 获取布局信息时，会导致重排。相关的方法属性如 `offsetTop` `getComputedStyle` 等

#### 如何减少重排重绘

1. 对 DOM 进行**批量写入和读取**（通过虚拟 DOM 或者 DocumentFragment 实现）。
2. 避免对样式频繁操作，了解常用样式属性触发 Layout / Paint / Composite 的机制，合理使用样式。
3. 合理利用特殊样式属性（如 `transform: translateZ(0)` 或者 `will-change`），将渲染层提升为合成层，开启 GPU 加速，提高页面性能。
4. 使用变量对布局信息（如 `clientTop`）进行缓存，避免因频繁读取布局信息而触发重排和重绘。

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

### 事件循环

> 参考资料
>
> - [并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
> - [手摸手带你彻底掌握，任务队列、事件循环、宏任务、微任务](https://juejin.cn/post/6979876135182008357)

<div align="center">
  <img src="/images/basic/The_Javascript_Runtime_Environment_Example.svg" />
</div>

> 多个运行时通信方法：
>
> 一个 `web worker` 或者一个跨域的 `iframe` 都有自己的栈、堆和消息队列。
> 两个不同的运行时只能通过 `postMessage` 方法进行通信。如果另一个运行时侦听 `message` 事件，则此方法会向该运行时添加消息。

浏览器的代码运行机制分为三个主要部分：

- **调用栈 Call Stack**：存放代码执行期间的所有执行上下文（回调函数）

- 堆 Heap：存放变量的值，通常是非结构化对象

- **消息队列 Queue**：待处理消息/任务队列

  > 任务进入任务队列，会利用到浏览器的其他线程。
  > 虽说 JS 是单线程语言，但是浏览器不是。浏览器不同的线程会对不同的事件进行处理，当对应事件可执行时，就将其放入任务队列。
  > 浏览器线程有：
  >
  > - js 引擎线程：用于解释执行 js 代码、用户输入、网络请求等；
  > - GUI 渲染线程：绘制用户界面，与 JS 主线程互斥（因为 js 可以操作 DOM，进而会影响到 GUI 的渲染结果）；
  > - http 异步网络请求线程：处理用户的 get、post 等请求，等返回结果后将回调函数推入到任务队列；
  > - 定时触发器线程：setInterval、setTimeout 等待时间结束后，会把执行函数推入任务队列中；
  > - 浏览器事件处理线程：将 click、mouse 等 UI 交互事件发生后，将要执行的回调函数放入到事件队列中。

由于 JS 是单线程的（只有一个执行栈），若有一个任务需长久等待（如网络请求），就会造成阻塞。由于 JS 主线程和渲染渲染线程相互阻塞，那么也会造成浏览器假死。
于是需要有异步机制，这需要**事件循环**来做任务调度。事件循环就是一直监听并一个一个地执行消息队列中的任务

#### 同步与异步任务

JS 将所有执行任务分为了同步任务和异步任务。

- 同步任务按照代码顺序和调用顺序，支持进入调用栈中并执行，执行结束后就移除调用栈。
- 异步任务依旧会进入调用栈中，然后发起调用，解释器会将其响应回调任务放入一个任务队列，紧接着调用栈会将这个任务移除。
  当主线程清空后，即所有同步任务结束后，解释器会读取任务队列，并依次将已完成的异步任务加入调用栈中并执行。

#### 宏任务与微任务

在任务队列中，其实还分为**宏任务队列（Task Queue）**和 **微任务队列（Microtask Queue）**，对应的里面存放的就是**宏任务**和**微任务**。
**宏任务和微任务都是异步任务**。

- 常见的宏任务：script(整体代码)、setTimeout、setInterval、I/O、UI 交互事件、postMessage、MessageChannel、setImmediate(Node 环境)
- 常见的微任务：async/await（后）、Promise.then、Object.observe、MutaionObserver、process.nextTick(Node 环境)

事件循环的具体流程如下：

- 首次执行时，解释器会将整体代码 script 放入宏任务队列中，即第一个入队任务
- 执行宏任务队列中第一个入队的任务，放入调用栈，开始执行；
- 执行完该宏任务下所有同步任务后，执行中间记录的微任务直至微任务队列清空为止；
  > 执行微任务时，产生新的微任务也需添加到微任务队列中，也需一起清空；微任务队列没清空之前，是不会执行下一个宏任务的
- 当微任务队列清空后，一个事件循环结束；接着从宏任务队列中，找到下一个执行的宏任务，开始第二个事件循环，直至宏任务队列清空为止。

#### 测试题

```js
async function async1() {
  console.log(1)
  await async2()
  console.log(2)
}
async function async2() {
  console.log(3)
}

console.log(4)

setTimeout(function() {
  console.log(5)
}, 0)

async1()

new Promise(function(resolve) {
  console.log(6)
  resolve()
})
  .then(function() {
    console.log(7)
  })
  .then(function() {
    console.log(8)
  })
console.log(9)

// 第一次执行 4 1 3 6 9
// 微任务 2 7
// 宏任务 5
```

### 垃圾回收

垃圾回收的方法有：

- 引用计数

  当声明了一个变量并将某个对象赋予它时，这个对象的引用数加一，反之减一。

  对引用数为 0 的变量清除。

  > 可以即刻回收垃圾，但是计数过程过于复杂，并且循环引用无法回收。

- 标记清除

  标记阶段，垃圾回收器由根对象开始遍历，所有根对象能访问到的对象会被标记为可到达对象。

  清除阶段，对内存从头到尾线性遍历，没有标记的对象一律回收。

  > 此方法实现简单，但是会造成大量的内存碎片。

如何定位内存泄露：

内存泄漏是指不再使用的内存，没有被垃圾回收机制回收。

代码量较小时，开发者通常可以基于以下基本原则快速自查，除此之外，开发者可以借助外部工具（如 DevTools 的 Memory 面板）进行内存泄漏排查。

1. 是否滥用全局变量，没有手动回收。
2. 是否没有正确销毁定时器、闭包。
3. 是否没有正确监听事件和销毁事件。

## ECMAScript 基础

### 前端模块化规范

> 参考：[前端模块化规范](https://febook.hzfe.org/awesome-interview/book1/js-module-specs)

#### 主要 JS 模块化规范类型

1. **CommonJS**: 主要是 **Node** 端使用，通过 `require` **同步**加载模块，`exports` 导出内容。

   - 优点：简单易用、可以在任意位置 require 模块、支持循环依赖
   - 缺点：同步的加载方式不适用于浏览器端、浏览器端使用需要打包、难以支持模块静态分析

2. **AMD**: 主要是**浏览器端**使用，通过 `define` 定义模块和依赖，`require` 异步加载模块，推崇依赖前置。

   - 优点：异步加载、支持循环依赖、支持插件
   - 缺点：语法相对复杂、依赖加载器、难以支持模块静态分析
   - 具体实现：RequireJs

   > CMD: 和 AMD 比较类似，主要是浏览器端使用，通过 `require` 异步加载模块，`exports` 导出内容，推崇依赖就近。

3. **UMD**: 通用模块规范，是 CommonJS、AMD 两个规范的大**融合**，是**跨平台**的解决方案。

   - 优点：跨平台兼容
   - 缺点：代码量稍大

   > UMD 加载模块的方式取决于所处的环境，Node.js 同步加载，浏览器端异步加载。

4. **ESM**: 官方模块化规范，现代浏览器原生支持，通过 `import` 加载模块，`export` 导出内容。

   - 优点：支持同步/异步加载、语法简单、支持模块静态分析、支持循环引用
   - 缺点：可能存在兼容性问题

   > ESM 加载模块的方式同样取决于所处的环境，Node.js 同步加载，浏览器端异步加载。

#### 为什么需要模块化和模块化规范 ​

模块化可以解决代码之间的变量、函数、对象等命名的冲突/污染问题，良好的模块化设计可以降低代码之间的耦合关系，提高代码的可维护性、可扩展性以及复用性。

模块化规范的作用是为了规范 JavaScript 模块的定义和加载机制，以统一的方式导出和加载模块，降低学习使用成本，提高开发效率。

#### Tree Shaking​

Tree Shaking 是一个通常用于描述移除 JavaScript 上下文中的未引用代码（dead-code）行为的术语。它依赖于 ES2015 中的 import 和 export 语句，用来检测代码模块是否被导出、导入，且被 JavaScript 文件使用。 Tree Shaking - MDN

简单来说，Tree Shaking 是一种依赖 ESM 模块静态分析实现的功能，它可以在编译时安全的移除代码中未使用的部分（webpack 5 对 CommonJS 也进行了支持，在此不详细展开）。

### TypeScript

### New 操作符原理

### 闭包

> [闭包的作用和原理](https://febook.hzfe.org/awesome-interview/book1/js-closures)

作用：能够在函数定义的作用域外，使用函数定义作用域内的局部变量，并且不会污染全局。

原理：基于词法作用域链和垃圾回收机制，通过维持函数作用域的引用，让函数作用域可以在当前作用域外被访问到。

前置概念：

- 作用域：用于确定在何处以及如何查找变量（标识符）的一套规则。

- 词法作用域：定义在词法阶段的作用域，由写代码时将代码和块作用域写在哪里来决定，因此用词法作用域处理代码是会保持作用域不变(大部分情况)。

- 块作用域：指的是变量和函数不仅可以属于所处的作用域，也可以属于某个代码块（通常用{}包裹）。常见的块级作用域有 with，try/catch，let，const 等。

- 函数作用域：属于这个函数的全部变量都可以在整个函数范围内使用及复用（包括嵌套作用域）。

- 作用域链：查找变量时，先从当前作用域开始查找，如果没有找到，就会到父级(词法层面上的父级)作用域中查找，一直找到全局作用域。作用域链正是包含这些作用域的列表。

### 继承

### 异步编程

## 样式

### BFC

#### BFC 是什么

BFC 全称为 block formatting context，中文为“块级格式化上下文”。它是一个只有块级盒子参与的独立块级渲染区域，它规定了内部的块级盒子如何布局，且与区域外部无关。

#### BFC 作用

1. 修复浮动元素造成的高度塌陷问题

2. 避免非期望的外边距折叠

3. 实现灵活健壮的自适应布局

#### 触发 BFC 的常见条件

- `<html>` 根元素

- `float` 的值不为 `none`

- `position` 的值不为 `relative` 或 `static`

- `overflow` 的值不为 `visible` 或 `clip`（除了根元素）

- `display`

  - `table-cell`，`table-caption`， `inline-block`，`flow-root`，`list-item`。
  - **flex 或 grid 直接子元素**
    即 `display` 的值为 `flex`/`inline-flex`/`grid`/`inline-grid` 的元素的直接子元素
    > 该子元素 `display` 不为 `flex`，`grid`，或 `table`

- `contain` 的值为 `layout`，`content`，`paint`，或 `strict` 中的任意一个
- `column-span` 设置为 `all` 的元素

> 提示：`display: flow-root`，`contain: layout` 等是无副作用的，可在不影响已有布局的情况下触发 BFC。

### 移动端自适应的方式

### CSS 预处理器

### CSS 后处理器

## 网络

### 前端安全问题

#### XSS 跨站脚本攻击

指攻击者在网页中注入恶意代码，在用户浏览网页的时候进行攻击。

类型：

1. 反射型（非持久性）

   **原理**：将攻击代码放在 url 地址的请求参数中，其他用户访问该恶意链接时，服务端在 URL 取出恶意代码后拼接至 HTML 中返回给用户浏览器。

   **要点**：

   - 通过 URL 插入恶意代码。
   - 有服务端参与。
   - 需要用户访问特定链接。

   **例子**：

   攻击者诱导被害者打开链接 `hzfe.org?name=<script src="http://a.com/attack.js"/>`。

   被攻击网站服务器收到请求后，未经处理直接将 URL 的 name 字段直接拼接至前端模板中，并返回数据。

   被害者在不知情的情况下，执行了攻击者注入的脚本（可以通过这个获取对方的 Cookie 等）。

2. 存储型（持久性）

   **原理**：攻击者将注入型脚本提交至被攻击网站数据库中，当其他用户浏览器请求数据时，注入脚本从服务器返回并执行。

   **要点**：

   - 恶意代码存储在目标网站服务器上。
   - 有服务端参与。
   - 只要用户访问被注入恶意脚本的页面时，就会被攻击。

   **例子**：

   攻击者在目标网站留言板中提交了 `<script src="http://a.com/attack.js"/>`。

   目标网站服务端未经转义存储了恶意代码，前端请求到数据后直接通过 innerHTML 渲染到页面中。

   其他用户在访问该留言板时，会自动执行攻击者注入脚本。

3. DOM 型

   **原理**：攻击者通过在 URL 插入恶意代码，客户端脚本取出 URL 中的恶意代码并执行。

   **要点**：在客户端发生。

   **例子**：

   攻击者诱导被害者打开链接 `hzfe.org?name=<script src="http://a.com/attack.js"/>`。

   被攻击网站前端取出 URL 的 name 字段后未经转义直接通过 innerHTML 渲染到页面中。

   被害者在不知情的情况下，执行了攻击者注入的脚本。

防范 XSS：​

- 对于外部传入的内容进行充分转义。
- 开启 CSP（Content Security Policy，内容安全策略），规定客户端哪些外部资源可以加载和执行，降低 XSS 风险。
- 设置 Cookie `httpOnly` 属性，禁止 JS 读取 Cookie 防止被窃取。

#### CSRF 跨站请求伪造

Cross Site Request Forgery，是指攻击者可以在用户不知情的情况下，窃用其身份在对应的网站进行操作

原理：攻击者诱导受害者进入第三方网站，在第三方网站中向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的身份凭证，达到冒充用户对被攻击的网站执行某项操作的目的。

要点：

- 利用浏览器在发送 HTTP 请求时会自动带上 Cookie 的原理，冒用受害者身份请求。
- 攻击一般发生在第三方网站上。
- 攻击者只能“冒用”受害者的身份凭证，并不能获取。
- 跨站请求有多种方式，常见的有图片 URL、超链接、Form 提交等。

例子：

攻击者在第三方网站上放置一个如下的 img

```html
<img src="http://hzfe.org/article/delete" />
```

受害者访问该页面后（前提：受害者在 hzfe.org 登录过且产生了 Cookie 信息），浏览器会自动发起这个请求，hzfe.org 就会收到包含受害者身份凭证的一次跨域请求。

若目标网站没有任何防范措施，那攻击者就能冒充受害者完成这一次请求操作。

防范：

1. 使用 CSRF Token 验证用户身份

   - 原理：服务端生成 CSRF Token （通常存储在 Session 中），用户提交请求时携带上 Token，服务端验证 Token 是否有效。
   - 优点：能比较有效的防御 CSRF （前提是没有 XSS 漏洞泄露 Token）。
   - 缺点：大型网站中 Session 存储会增加服务器压力，且若使用分布式集群还需要一个公共存储空间存储 Token，否则可能用户请求到不同服务器上导致用户凭证失效；有一定的工作量。

2. 双重 Cookie 验证

   - 原 理：利用攻击者不能获取到 Cookie 的特点，在 URL 参数或者自定义请求头上带上 Cookie 数据，服务器再验证该数据是否与 Cookie 一致。
   - 优点：无需使用 Session，不会给服务器压力。

3. 设置 Cookie 的 SameSite 属性可以用来限制第三方 Cookie 的使用，可选值有 Strict、Lax、None。

   - Strict：完全禁止第三方 Cookie。
   - Lax：只允许链接、预加载请求和 GET 表单的场景下发送第三方 Cookie。
   - None：关闭 SameSite 属性。

4. 设置白名单，仅允许安全域名请求
5. 增加验证码验证

#### 中间人攻击（MITM）

是指攻击者与通讯的两端分别创建独立的联系，在通讯中充当一个中间人角色对数据进行监听、拦截甚至篡改。

成功的中间人攻击主要有两个不同的阶段：**拦截和解密**。

##### 拦截 ​

即攻击者需要用户数据在到达目标设备前拦截并通过攻击者的网络。分为被动攻击和主动攻击。

常见的被动攻击（也是最简单）的方法，攻击者向公众提供免费的恶意 WiFi 热点，一旦有受害者连接了该热点，攻击者就能完全了解其所有的在线数据交换。

常见的主动攻击有两种：

- ARP 欺骗： 攻击者利用 ARP 的漏洞，通过冒充网关或其他主机，使得到达网关或其他主机的流量通过攻击者主机进行转发。
- DNS 欺骗： 攻击者冒充域名服务器，将受害者查询的 IP 地址转发到攻击者的 IP 地址。

##### 解密 ​

拦截后，若连接是使用 HTTPS 协议即传递的数据用了 SSL / TLS 加密，这时还需要其他手段去解密用户数据。

1. SSL 劫持（伪造证书）

   攻击者在 TLS 握手期间拦截到服务器返回的公钥后，将服务器的公钥替换成自己的公钥并返回给客户端，这样攻击者就能用自己的私钥去解密用户数据，也可以用服务器公钥解密服务器数据。

   因为是伪造的证书，所以客户端在校验证书过程中会提示证书错误，若用户仍选择继续操作，此时中间人便能获取与服务端的通信数据。

2. SSL 剥离

   攻击者拦截到用户到服务器的请求后，攻击者继续和服务器保持 HTTPS 连接，并与用户降级为不安全的 HTTP 连接。

   服务器可以通过开启 HSTS（HTTP Strict Transport Security）策略，告知浏览器必须使用 HTTPS 连接。但是有个缺点是用户首次访问时因还未收到 HSTS 响应头而不受保护。

##### 中间人攻击防范 ​

对于开发者来说：

- 支持 HTTPS。
- 开启 HSTS 策略。

对于用户来说：

- 尽可能使用 HTTPS 链接。
- 避免连接不知名的 WiFi 热点。
- 不忽略不安全的浏览器通知。
- 公共网络不进行涉及敏感信息的交互。
- 用可信的第三方 CA 厂商，不下载来源不明的证书。

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

#### 双向绑定

Vue 通过 `v-model` 实现双向绑定。`v-model` 实际是 `v-bind:xxx` 和 `v-on:xxx` 的语法糖。当触发元素对应的事件（如 `input`、`change` 等）时更新数据（`ViewModel`），当数据（`ViewModel`）更新时同步更新到对应 `View` 上。

#### MVVM（Model-View-ViewModel）

MVVM 模式是一种软件架构模式，相比 MVC 模式多了一个 `ViewModel` 层。有助于将图形用户界面的开发与业务逻辑或后端逻辑（数据模型）的开发分离开来。

- `Model`：模型层，负责处理业务逻辑以及和服务器端进行交互。
- `View`：视图层，将数据通过 UI 展现出来。
- `ViewModel`：视图模型层，连接 `Model` 层和 `View` 层。

#### 响应式更新机制

前置概念：

- 响应式对象：Vue2 通过 `Object.defineProperty`，Vue3 通过 `Proxy` 来劫持 `state` 中各个属性的 `setter`、`getter`。
  通过 `getter` 收集依赖。当 `state` 中的数据发生变动之后发布通知给**订阅者**更新数据。

- 实现模块：Dep（实现发布订阅模式的模块），Watcher（订阅更新和触发视图更新的模块）。

Vue 内数据变化与发布更新的流程如图：

<div align="center">
  <img src="/images/basic/vue-data-update.png" width=600 />
</div>

1. Vue3 通过 Proxy 来劫持 state 中各个属性的 getter、setter。
   其中 getter 中主要是通过 Dep 收集依赖这个属性的订阅者，setter 中则是在属性变化后通知 Dep 收集到的订阅者，派发更新。

2. Vue 会在需要使用到属性的地方新建一个 Watcher 实例，watcher 实例化时会读取对应属性的内容，从而触发 getter，将 watcher 注册进 Dep 中。

3. state 属性更新时会触发属性的 setter，setter 中会触发 Dep 的更新，Dep 通知收集到的 watcher 更新，watcher 获取到更新的数据之后触发更新视图。

#### vue2 vue3 数据劫持差别

Vue2 使用的 Object.defineProperty 并不能完全劫持所有数据的变化，以下是几种无法正常劫持的变化：

- 无法劫持新创建的属性，为了解决这个问题，Vue2 提供了 `Vue.set` 以创建新属性。
- 无法劫持数组的变化，为了解决这个问题，Vue2 对数组原生方法进行了劫持。
- 无法劫持利用索引修改数组元素，这个问题同样可以用 `Vue.set` 解决。

​Vue3 使用的是 Proxy。Proxy 可以创建一个对象的代理，从而实现对这个对象基本操作的拦截和自定义。

#### computed 和 watch 的区别

computed 是模板表达式的声明式描述，会创建新的响应式数据。
而 watch 是响应式数据的自定义侦听器，用于响应数据的变化。

除此之外，computed 还具有可缓存，可依赖多个属性，getter 函数无副作用等特点。

watch 则更适用于异步或开销大的操作。

在了解 Vue 数据双向绑定的基础上，computed 等同于为属性设置 getter 函数（也可设置 setter）。

而 watch 等同于为属性的 setter 设置回调函数、监听深度 deep 及响应速度 immediate。

### react
