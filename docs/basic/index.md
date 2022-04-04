---
sidebar: auto
---

# 关于证明我是一名 JS 程序员这件事

## 浏览器

浏览器是前端开发的主要运行环境。
主要功能为向服务器请求资源，并在窗口中展示，资源一般指 HTML 文档，或 PDF、图片及其它格式。

如下图，浏览器的主要组件包括：

- 用户界面（User Interface），页面内容外的部分，包括地址栏、后退/前进按钮、书签目录等；
- 浏览器引擎（Browser engine），用来查询及操作渲染引擎的接口；
- 渲染引擎（Rendering engine）：解析请求内容与显示页面；
- 网络（Networking）：用于网络调用；
- 用户界面后端（UI Backend）：浏览器的基本图形库，用来绘制类似组合选择框及对话框等基本组件，底层使用操作系统接口；
- JS 解释器(JavaScript interpreter) ：解释执行 JS 代码；
- 数据持久化（Data Persistence）：指浏览器的 Cookie、Local Storage 等数据存储机制。

<div align="center">
  <img src="/images/basic/browser-structure.png" width=600 />
</div>

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

### 浏览器跨域

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
