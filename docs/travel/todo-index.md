# Todo React: index.js

为了与 react/vue 等常用方式相同，在 index.js 中使用 `render(<App cacheKey='todo-app-vdom-component' />, document.body);`，用 `<App/>` 替换先前的 `new App({cacheKey: 'todo-app-xxx'}).mount()`

```js
import App from './App';
import { createElement, render } from './diff';

render(<App cacheKey='todo-app-vdom-component' />, document.body);
```

因为 `<App/>` 是一个虚拟 dom，所以需要把其转换为真实 dom，需要 mount 操作。

```js
export function render(component, container) {
  mount(component, container);
}
```

在 mount 过程中，App 类型是 Function，所以需要进行特殊处理，看 diff.js
