# Vite，下一代前端工具

## 笔记来由

其实蛮早就用过 vite，也看过不少介绍 vite 的帖子，但也就是一知半解。

正好去参加了 GMTC2021，尤雨溪尤大（又又...又又）给 vite 打了广告，噢，不是，是作了分享。

于是就借着这个机会梳理一下 vite。

> note：此篇笔记参考尤大的分享、vite 文档，和一些分享者写的帖子。

## 现实问题与为什么会有 vite

在 ES 模块之前，JavaScript 并没有提供原生的模块机制让开发者开发。

这也是为什么需要 “打包” 这一步骤：使用工具抓取、处理，并将我们的源码模块串联成可以在浏览器中运行的文件。

为了解决这个问题，webpack、Rollup 和 Parcel 等工具出现了，极大地改善了前端开发者的开发体验。

然而，当开始构建越来越大型的应用时，需要处理的 JavaScript 代码量和模块数也越来越多，于是开始遇到性能瓶颈。

使用 JavaScript 开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器。

即使使用 HMR，文件修改后的效果也需要几秒钟才能在浏览器中反映出来。

如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。

大约在 2020 年 4 月的时候，尤大发了这样一个 推：

此处有图！

而如今条件已经成熟：

前端生态系统中的新进展：浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。

- 现代 JS 支持广泛铺开
  - ES Modules 已经 92.83% 的全球浏览器支持率
  - 微软推 Edge，想要干掉 IE11
- 新一代的用原生编译语言写的 JS 编译器，两者都比基于 JS 的编译工具快一个数量级
  - 基于 Go 的 esbuild
    > Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。
  - 基于 Rust 的 SWC

## vite 主旨

vite，法语发音`/vit/`，法语意为“快”。

提高 **前端开发体验** ，服务对象为前端开发者。

## Vite 定义与组成

vite 是一个构建工具。

由两个部分组成：

- 一个 No-Bundle 开发服务器
  源文件无需打包，直接以原生 ES Module 的形式加载
- 一套构建指令，用于生产构建
  使用 Rollup 打包代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

## 原生 ESM 开发服务器

当冷启动开发服务器时，基于打包器的方式启动必须优先抓取并构建你的整个应用，然后才能提供服务。

Vite 通过在一开始将应用中的模块区分为 **依赖** 和 **源码** 两类，以改进开发服务器启动时间。

- 依赖

  大多为在开发时不会变动的纯 JavaScript。

  一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS），vite 将会使用 esbuild 预构建依赖。

  然后后续就不需要怎么变动了。

- 源码

  通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS），时常会被编辑。

  同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。

  Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。

  根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

### 技术挑战

HTTP 请求开销，加载大量的小模块=大量的并发 HTTP 请求=慢。像 lodash-es 包含超过 700 个内部模块

### 解决办法

减少 HTTP 请求开销

1. 用 esbuild 进行依赖预打包
   保证一个依赖最多对应一个 HTTP 请求，同时处理 CommonJS 转 ESM 的兼容

2. 利用 HTTP Header 缓存依赖
   对预打包过的依赖的请求会带有 `?v=xxxxx`的参数
   再加上**强缓存**`Cache-Control: mac-age=31536000, immutable`
   除非版本变化，否则不会再产生 HTTP 请求

3. 优化源文件请求
   使用**协商缓存**策略。源文件返回的 header 带有 etag，服务器会保存每个文件的更新状态，没有改动的文件直接返回 `304 Not Modified`

### 热更新

先来说说通用的热更新实现，热更新一般需要四个部分：

- 首先需要 web 框架支持模块的 rerender/reload

- 通过 watcher 监听文件改动

- 通过 server 端编译资源，并推送新模块内容给 client 。

- client 收到新的模块内容，执行 rerender/reload

vite 也不例外同样有这四个部分

#### client 端

在 client 端， WebSocket 监听了一些更新的类型，然后分别处理，它们是：

- vue-reload —— vue 组件更新：通过 import 导入新的 vue 组件，然后执行 HMRRuntime.reload

- vue-rerender —— vue template 更新：通过 import 导入新的 template ，然后执行 HMRRuntime.rerender

- vue-style-update —— vue style 更新：直接插入新的 stylesheet

- style-update —— css 更新：document 插入新的 stylesheet

- style-remove —— css 移除：document 删除 stylesheet

- js-update —— js 更新：直接执行

- full-reload —— 页面 roload：使用 window.reload 刷新页面

### server 端

以 js vue 模块为例

在 server 端，通过 watcher 监听页面改动，根据文件类型判断执行：

```js
watcher.on('change', async (file) => {
  const timestamp = Date.now();
  if (file.endsWith('.vue')) {
    handleVueReload(file, timestamp);
  } else if (
    file.endsWith('.module.css') ||
    !(file.endsWith('.css') || cssTransforms.some((t) => t.test(file, {})))
  ) {
    // everything except plain .css are considered HMR dependencies.
    // plain css has its own HMR logic in ./serverPluginCss.ts.
    handleJSReload(file, timestamp);
  }
});
```

在 handleVueReload 方法里，会使用解析器拿到当前文件的 template/script/style ，并且与缓存里的上一次解析的结果进行比较，如果 template 发生改变就执行 vue-rerender，如果 style 发生改变就执行 vue-style-update。

handleJSReload 方法则是根据文件路径引用，判断被哪个 vue 组件所依赖，如果未找到 vue 组件依赖，则判断页面需要刷新，否则走组件更新逻辑，这里就不贴代码了。

### 总结一下优点

- 不需要打包源码
- 自然按需处理
- 可直接利用浏览器缓存
- 可以实现更方便的热更新

### 整体的性能取舍

- 服务器启动：极大加快，因为不需要打包了
- 第一次页面加载会稍慢（视加载页面用到的源文件数量而定），启动后全页面刷新速度不变
- 热更新极大加快

### 进一步优化的空间

- 针对源文件的文件系统缓存，以加快热启动的首次页面加载
- 用原生模块替换现有的模块改写链路，目前使用的是 acorn + magic-string（这是 rollup 的工具）

## 生产构建（打包）

尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP2）。

为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。

所以不打包的部署模式会导致大量的级联 HTTP 请求，对缓存策略也有复杂的要求，目前来说依然不如打包的部署策略。

### 为何使用 Rollup 打包而不用 ESBuild 打包？

虽然 esbuild 很快，但它比较擅长构建库，针对构建 应用 的重要功能仍然还在持续开发中（特别是代码分割和 CSS 处理方面）。

Rollup 是一个为 ES module 而生的打包工具，并且有成熟的 tree-shaking 实现。就目前来说，针对应用打包的场景比 esbuild 成熟很多。

采用 Rollup 让 Vite 能够做到下面这些，采用 esbuild 就很难

- 自动 CSS 代码分割
- 对异步懒加载请求的自动优化
- 手动的代码分割控制

缺点是 Rollup 打包速度比 esbuild 慢，可是打包只是整个构建的一个部分而已，而且使用频率很低、

### 保证打包质量

要确保开发服务器和生产环境构建之间的最优输出和行为一致并不容易。所以 Vite 附带了一套 构建优化 的 构建命令，开箱即用。

合理的默认配置
开箱即用的工具
重复的配置=>约定

Vite 的哲学是：

- 针对 90% 的主流用户需求进行优化
- 大部分进阶需求通过插件支持
- 长尾特殊需求就让其它专用工具去做吧

## 使用

vite 虽然在 vue 生态中，却没有与 Vue 强制绑定，兼容支持 React、Svelte、Preact、Vanilla 等，这意味着 Vite 可以被应用在大多数现代技术栈中。

```bash
yarn create vite XXX --template YYY
```

- vanilla
- vanilla-ts
- vue
- vue-ts
- react
- react-ts
- preact
- preact-ts
- lit-element
- lit-element-ts
- svelte
- svelte-ts

或者直接 `yarn add -D vite` 和安装其它包，再按照规范新建文件，也是很方便的。

## 其它

只要开发的时候支持 esm 就行了
传统浏览器可以通过官方插件 @vitejs/plugin-legacy 支持

## 参考

-[Vite 官方文档 v.2.4.2](https://cn.vitejs.dev/)

-[vite：一种新的、更快地 web 开发工具](https://mp.weixin.qq.com/s/xdg1NIZYdNQgbunVUGh38w)
