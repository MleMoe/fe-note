# Fiber

## 为什么要有 Fiber

React 的 diff 算法虽然经过优化，可它却是同步的，renderer 负责操作 DOM 的 appendChild 等 API 也是同步的。

如果有大量节点需要更新，JS 线程的运行时间可能会比较长，在这段时间浏览器是不会响应其它事件。因为 JS 线程和 GUI 线程是互斥的，JS 运行时页面就不会响应。这个时间太长了，用户就可能看到卡顿，特别是动画的卡顿会很明显。

而 Fiber 就是用来解决这个问题的，Fiber 可以将长时间的同步任务拆分成多个小任务，从而让浏览器能够抽身去响应其它事件，等它空了再回来继续计算，这样整个计算流程就显得平滑很多。

## 需要解决的问题

递归遍历 vDom 树时，如果我们在中途某一步停下来，下次再调用时其实并不知道上次在哪里停下来的。所以 vDom 的树形结构并不满足中途暂停，下次继续的需求，需要改造数据结构。

另一个需要解决的问题是，拆分下来的小任务什么时候执行？我们的目的是让用户有更流畅的体验，所以我们最好不要阻塞高优先级的任务，比如用户输入，动画之类，等它们执行完了我们再计算。那我怎么知道现在有没有高优先级任务，浏览器是不是空闲呢？

总结下来，Fiber 要想达到目的，需要解决两个问题：

- 新的任务调度，有高优先级任务的时候将浏览器让出来，等浏览器空了再继续执行
- 新的数据结构，可以随时中断，下次进来可以接着执行。

## 任务调度

我们可以使用 requestIdleCallback 来实现任务调度。
requestIdleCallback 接收一个回调，这个回调会在浏览器空闲时调用。

callback 函数会接收到一个名为 IdleDeadline 的参数，这个参数可以获取**当前空闲时间**，以及回调是否在超时时间前已经执行的状态。
options 可设置属性 timeout。如果指定了 timeout 并具有一个正值，并且尚未通过超时毫秒数调用回调，那么回调会在下一次空闲时期被强制执行，尽管这样很可能会对性能造成负面影响。

```js
/**
 *
 * @callback 一个在事件循环空闲时即将被调用的函数的引用。
 * @options 配置参数
 * @return 一个 ID，可以把它传入 Window.cancelIdleCallback() 方法来结束回调
 * /
var handle = window.requestIdleCallback(callback[, options])
```

> 但是这个 API 还在实验中，兼容性不好，所以 React 官方自己实现了一套。

我们进行任务调度的思想是将任务拆分成多个小任务， requestIdleCallback 里面不断的把小任务拿出来执行，当所有任务都执行完或者超时了就结束本次执行，同时要注册下次执行，代码架子就是这样：

```js
function workLoop(deadline) {
  // 目前浏览器是空闲的，而且还有下一个任务没有做完
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 如果任务还没完，但是时间到了，我们需要继续注册requestIdleCallback
  requestIdleCallback(workLoop);
}

// performUnitOfWork用来执行任务，参数是我们的当前fiber任务，返回值是下一个任务
function performUnitOfWork(fiber) {}

requestIdleCallback(workLoop);
```

上面我们的 performUnitOfWork 并没有实现，但是从上面的结构可以看出来，它接收的参数是一个小任务，同时通过这个小任务还可以找到它的下一个小任务，Fiber 构建的就是这样一个数据结构。Fiber 之前的数据结构是一棵树，父节点的 children 指向了子节点，但是只有这一个指针是不能实现中断继续的。

Fiber 就是改造了这样一个结构，加上了指向父节点和 sibling 节点的指针。
