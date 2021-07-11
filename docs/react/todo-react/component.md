# 第二课：组件化

支持组件 Component，需要将 App.js render 方法中的 jsx 内容，分装成多个组件。

## VDom-renderVDom-Dom

直接抽出组件为 Header/Footer/List/Todo，它是跑不起来的。在 createElement 时，不能直接生成对应组件名的 element。该组件名/type 是一个函数。

为此需要修改 mount 方法，将该 vdom 生成正确的 dom。

除了 type 是 text 或 string，抽象成组件后，type 可能是一个类，也就是一个函数。

针对组件的 type，先生成一个实例 instance，再调用 instance 的 render 方法生成 renderVdom，然后递归调用 mount 方法，生成 dom 内容。

## setState

我们为什么要提供一个 setState()方法？它除了设置 state，还可以判断字段变化，触发一次 update。

## ref

主要是为了找到对应组件的 dom 引用。createRef 写法：

```js
export function createRef(current) {
  return { current };
}
```

使用：

```js
this.inputRef = createRef();

<header className='header'>
  <h1>todos</h1>
  <input ref={this.inputRef} />
</header>;
```

## 生命周期

如果我们要在页面初始化后，让 input 进行聚焦，那怎么办呢？我们需要一些组件的生命周期。
我们需要提供一个 ref，用于让组件周期中，找到对应组件的 dom 引用。要让组件支持 ref。不然写起来太麻烦了。
为了满足一些需求，我们还需要提供 didMount 等一些回调。

## 问题

- 为什么 diff component 组件的时候，不需要在 loop 中 diff 组件的子节点？
  因为子组件在 parent 组件 mount 后已经是 TEXT/String 类型的 vdom 了。

- 每个组件都需要写一遍 constructor 是不是很烦，怎么简化？每个组件都需要写一遍 update 是不是也可以相同的方式进行简化？
  设置 parent class Component

- 为什么我们在 diff 中增加 componentDidMount 之后，节点仍然没有找到呢？
  因为是从底至上 appendChild，需更改递归次序

- 为什么要用 createRef，而不是直接让 this.inputRef = null;
  保存引用

- 如何区分 class 和 function
  使用 `if (type.prototype instanceof Component)`
  因为 instance 本来就是判断的原型链

App 的 render 方法用来生成需挂载的虚拟 dom。其中一个问题是，整个 App 的全部内容都放于此，不利于复用。为此，我们可以拆分组件。可拆出：Header、List、Todo、Footer。
首先拆分出一个 Header 作为测试例子。

开始了

header
section
footer

如何渲染一个类

不用对象，而用最小粒度

为什么过滤没有生效，diff 里面

newVdom 没有 mount
复用 instance

child 是自定义组件时，是不是还要做处理。不用

点点点

问题：继承

eslint off

`<App/>`

.vdom

update

setState

onFocus

生命周期

父节点没有挂上去，从底向上，递归

ref，原先的选择方式不优雅

保持引用，反向引用

事件绑定

事件监听

生命周期移除监听

删除时放置

diff 时可能有问题

Fun 和 class 共存

判断 Class 和 Function

[B]

return

为什么 type.prototype instance Com 是 true

instance 本质判断原型链
